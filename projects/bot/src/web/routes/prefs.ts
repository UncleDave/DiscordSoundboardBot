import { Router } from 'express';
import { PrefsService } from 'botman-users';

function prefsRouter(prefsService: PrefsService) {
  const router = Router();

  router.put('/', async (req, res) => {
    await prefsService.setSortPrefs(String(req.cookies.userid), { sortOrder: req.body.sortOrder, tagGroups: req.body.groupOrder });
    res.sendStatus(204);
  });

  router.put('/:introsound', async (req, res) => {
    await prefsService.setIntroSound(String(req.cookies.userid), req.params.introsound);
    res.clearCookie('missingIntroSound');
    res.sendStatus(204);
  });

  return router;
}

export default prefsRouter;
