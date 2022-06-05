import {Router} from "express";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import jwt from 'jsonwebtoken';

import config from "../config";
import IUserService from "../services/iServices/iUserService";
import {BaseController, StaticController} from "../core/infra/baseController";
import INoIdUserDto from "../dto/iNoIdDto/iNoIdUserDto";
import IUserHiddenPassword from "../dto/iUserHiddenPwd";
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
    async (req, res) => {
      const ctrl = new BaseController(req, res);
      try {
        const user = await service.addUser(req.body as INoIdUserDto);
        const accessJwt = jwt.sign(user, config.api.jwt.accessSecret, config.api.jwt.signOptions);
        const refreshToken = jwt.sign(user, config.api.jwt.refreshSecret, config.api.jwt.signOptions);
        const body = {...user, accessJwt};
        return ctrl.response(201, body, [{name: `refreshJwt`, value: refreshToken}]);
      } catch (e) {
        ctrl.handleException(e);
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
    async (req, res) =>
      await StaticController.simpleController(res, async () => {
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
    }),
    async (req, res) => {
      const ctrl = new BaseController(req, res);
      try {
        const {email, password} = req.body;
        const body = await service.verifyPassword(email, password);
        if (!body.passwordIsCorrect) return ctrl.response(401);

        const jsonForWt = {domainId: body.domainId, email};
        const accessJwt = jwt.sign(jsonForWt, config.api.jwt.accessSecret, config.api.jwt.signOptions);
        const refreshJwt = jwt.sign(jsonForWt, config.api.jwt.refreshSecret, config.api.jwt.signOptions);
        return ctrl.response(200, accessJwt, [{name: 'refreshJwt', value: refreshJwt}]);
      } catch (e) {
        return ctrl.handleException(e);
      }
    }
  );

  route.get('/refreshToken',
    celebrate({
      cookies: {
        refreshJwt: Joi.string().required()
      }
    }),
    async (req, res) => {
      const ctrlr = new BaseController(req, res);
      try {
        let user;
        try {
          user = jwt.verify(req.cookies.refreshJwt, config.api.jwt.refreshSecret) as IUserHiddenPassword;
        } catch (e) {
          return ctrlr.response(403, 'Bad refresh token: wrong JSON object');
        }
        const existingUser = await service.getUserHidePwd(user.email);
        if (existingUser.domainId !== user.domainId || existingUser.email !== user.email)
          return ctrlr.response(403, 'token does not correspond to user');

        const newAccessToken = jwt.sign(user, config.api.jwt.accessSecret);
        return ctrlr.created(newAccessToken);
      } catch (e) {
        return ctrlr.handleException(e);
      }
    });

}
