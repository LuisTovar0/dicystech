import {Router} from 'express';
import product from './productController';
import debug from './debugController';

export default () => {
  const router = Router();

  product(router);
  debug(router);

  return router;
}