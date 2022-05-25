import {Router} from 'express';
import debug from './debugController';

export default () => {
  const router = Router();

  debug(router);

  return router;
}