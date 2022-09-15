import {Router} from 'express';
import debug from './debug.route';
import conf from "./config.route";
import user from './user.route';
import lab from './lab.route';

export default () => {
  const router = Router();

  debug(router);
  conf(router);
  user(router);
  lab(router);

  return router;
}
