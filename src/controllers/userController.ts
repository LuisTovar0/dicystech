import {Router} from "express";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";

import config from "../config";
import IUserService from "../services/iServices/iUserService";
import {StaticController} from "../core/infra/baseController";
import INoIdUserDto from "../dto/iNoIdDto/iNoIdUserDto";

const route = Router();

export default (app: Router) => {

  app.use('/user', route);

  const service = Container.get(config.deps.services.user.name) as IUserService;

  route.post('', celebrate({
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    async (req, res, next) =>
      StaticController.simpleController(res, next, async () =>
          await service.addUser(req.body as INoIdUserDto),
        StaticController.k)
  );

  route.post('/newpassword',
    celebrate({
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    async (req, res, next) =>
      await StaticController.simpleController(res, next, async () => {
        const {email, pwd} = req.body;
        return await service.updateUserPwd(email, pwd);
      }, StaticController.k)
  );

  route.post('/authenticate',
    celebrate({
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    async (req, res, next) => {
      await StaticController.simpleController(res, next, async () => {
        const {email, pwd} = req.body;
        return await service.verifyPassword(email, pwd);
      }, StaticController.k);
    }
  );

}