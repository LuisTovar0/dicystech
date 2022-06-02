import {Router} from 'express';
import debug from './debugController';
import user from './userController';

export default () => {
  const router = Router();

  debug(router);
  user(router);

  return router;
}