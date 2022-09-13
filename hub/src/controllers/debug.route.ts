import {Router} from 'express';
import {StaticController} from "../core/infra/baseController";
import config from "../core/config";
import {authorization} from "./index";

const route = Router();
export default (app: Router) => {

  app.use('/debug', route);

  if (config.env === 'development') {

    route.get('', (req, res) => StaticController.k(res, `Nice, bro`));

    route.get('/testauthorization',
      authorization,
      (req, res) => StaticController.k(res));

  } else route.get('*', (req, res) =>
    StaticController.response(res, 418, 'Route not available outside development.'));

}
