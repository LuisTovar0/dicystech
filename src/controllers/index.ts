import {Router} from 'express';
import debug from './debugController';
import product from './productController';

export default () => {
  const router = Router();

  debug(router);
  product(router);

  return router;
}