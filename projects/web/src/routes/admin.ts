import express from 'express';

const adminRouter = express.Router();

adminRouter.use(async (req, res, next) => {
  if (req.userRole === 'admin')
    return next();
  return res.sendStatus(403);
});

export default adminRouter;
