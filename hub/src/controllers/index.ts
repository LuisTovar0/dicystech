import {NextFunction, Request, Response, Router} from 'express';
import jwt from "jsonwebtoken";

import config from "../config";
import {StaticController} from "../core/infra/baseController";
import IUserHiddenPassword from "../dto/iUserHiddenPwd";
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

export function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return StaticController.badRequest(res, `The request does not have an 'authorization' header.`);

  jwt.verify(token, config.api.jwt.accessSecret, (err, user) => {
    if (err) {
      StaticController.response(res, 403, `The access token could not be decrypted, it's probably expired.`).send();
      return;
    }
    if (!(user as IUserHiddenPassword)) {
      StaticController.response(res, 403, `The access token was decoded to an invalid format.`).send();
      return;
    }
    req.body.requester = user;
    next();
  });
}
