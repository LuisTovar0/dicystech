import {Router} from 'express';
import {StaticController} from "../core/infra/baseController";

const route = Router();
export default (app: Router) => {
  app.use('/debug', route);
  app.get('', (req, res) => {
    return StaticController.k(res, `Nice, bro`);
  });
}