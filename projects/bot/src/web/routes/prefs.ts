import { Router } from 'express';
import { PrefsService } from 'botman-users';

function prefsRouter(prefsService: PrefsService) {
  const router = Router();

  router.put('/', async (req, res) => {
    if (req.body.sortOrder) {
      await prefsService.setSortPrefs(String(req.cookies.userid), { sortOrder: req.body.sortOrder, tagGroups: req.body.groupOrder });
      res.sendStatus(204);
      return;
    }

    await prefsService.setUserTheme(String(req.cookies.userid), { theme: req.body.themeName, useSeasonal: req.body.useSeasonal });
    res.sendStatus(204);
  });

  router.put('/:introsound', async (req, res) => {
    await prefsService.setIntroSound(String(req.cookies.userid), req.params.introsound);
    res.sendStatus(204);
  });

  return router;
}

export default prefsRouter;
