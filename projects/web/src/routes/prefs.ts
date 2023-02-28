import { Router } from 'express';
import { PrefsService } from 'botman-users';

function prefsRouter(prefsService: PrefsService) {
  const router = Router();

  router.put('/', async (req, res) => {
    await prefsService.setSortOrderPref(String(req.cookies.userid), req.body.sortOrder);
    await prefsService.setGroupsPref(String(req.cookies.userid), req.body.groupOrder);
    res.sendStatus(204);
  });

  return router;
}

export default prefsRouter;
