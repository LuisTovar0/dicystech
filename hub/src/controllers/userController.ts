import {Router} from "express";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import jwt from 'jsonwebtoken';

import config from "../config";
import IUserService from "../services/iServices/iUserService";
import {BaseController, StaticController} from "../core/infra/baseController";
import INoIdUserDto from "../dto/iNoIdDto/iNoIdUserDto";
import IUserHiddenPassword from "../dto/iUserHiddenPwd";
import logger from "../core/loaders/logger";
import {authorization} from "./index";

const route = Router();

export default (app: Router) => {

  app.use('/user', route);

  const service = Container.get(config.deps.services.user.name) as IUserService;

  route.post('',
    celebrate({
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    async (req, res, next) => {
      const crtl = new BaseController(req, res, next);
      try {
        const user = await service.addUser(req.body as INoIdUserDto);
        const accessJwt = jwt.sign(user, config.api.jwt.accessSecret);
        const refreshToken = jwt.sign(user, config.api.jwt.refreshSecret);
        const body = {...user, accessJwt};
        return crtl.response(201, body, [{name: 'refreshJwt', value: refreshToken}, {name: 'hello', value: 'world'}]);
      } catch (e) {
        console.log('b');
        crtl.handleException(e);
      }
    }
  );

  route.post('/newpassword',
    celebrate({
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }), authorization,
    async (req, res, next) =>
      await StaticController.simpleController(res, next, async () => {
        const {email, pwd} = req.body;
        return await service.updateUserPwd(email, pwd);
      }, StaticController.accepted)
  );

  route.post('/authenticate',
    celebrate({
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }), authorization,
    async (req, res, next) =>
      await StaticController.simpleController(res, next,
        async () => {
          const {email, pwd} = req.body;
          return await service.verifyPassword(email, pwd);
        },
        StaticController.k)
  );

  route.get('/newAccessToken',
    celebrate({
      cookies: {
        refreshToken: Joi.string().required()
      }
    }),
    async (req, res) => {
      const user = JSON.parse(jwt.verify(req.cookies.refreshToken, config.api.jwt.refreshSecret).toString());
      if (user as IUserHiddenPassword) {
        const existingUser = await service.getUser(user.email);
        if (existingUser.domainId !== user.domainId || existingUser.email !== user.email)
          return StaticController.response(res, 403, 'token does not correspond to user');
        const newAccessToken = jwt.sign(user, config.api.jwt.accessSecret);
        return StaticController.k(res, newAccessToken);
      } else {
        logger.error(`the refresh token wasn't a user`);
        console.log(user);
        return StaticController.response(res, 403, 'bad refresh token! is not the correct JSON!');
      }
    });

}
