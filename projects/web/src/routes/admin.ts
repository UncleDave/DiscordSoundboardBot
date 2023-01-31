import { Router } from 'express';
import { SoundsService } from 'botman-sounds';

function adminRouter(soundsService: SoundsService) {
  const router = Router();

  router.use(async (req, res, next) => {
    if (req.userRole === 'admin')
      return next();
    return res.sendStatus(403);
  });

  router.delete('/deletesound/:soundname', async (req, res) => {
    await soundsService.deleteSound(req.params.soundname);
    res.sendStatus(200);
  });

  router.put('/renamesound/:oldname/:newname', async (req, res) => {
    await soundsService.renameSound({ oldName: req.params.oldname, newName: req.params.newname });
    res.sendStatus(200);
  });

  return router;
}

export default adminRouter;
