import {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";

import config from "../core/config";
import {StaticController} from "../core/infra/baseController";
import IUserHiddenPassword from "../dto/jsonDto/iUserHiddenPwd";

export function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return StaticController.badRequest(res, `The request does not have an 'authorization' header.`);

  jwt.verify(token, config.api.jwt.accessSecret, (err, user) => {
    if (err) {
      StaticController.response(res, 403, `The access token could not be decrypted. It's probably expired.`).send();
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

export function dbIsConnected(req: Request, res: Response, next: NextFunction) {
  if (config.db.connected)
    next();
  else
    StaticController.response(res, 503, `The server isn't connected to the MongoDB database.`);
}
