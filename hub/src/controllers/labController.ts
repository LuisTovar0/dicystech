import {Router} from "express";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import {StaticController} from "../core/infra/baseController";
import ILabService from "../services/iServices/iLabService";
import config from "../config";
import INoIdLabDto from "../dto/iNoIdDto/iNoIdLabDto";

const {created} = StaticController;

const route = Router();

export default (app: Router) => {

  app.use('/lab', route);

  const service = Container.get(config.deps.services.lab.name) as ILabService;

  route.post('',
    celebrate({
      body: {
        name: Joi.string().required(),
        country: Joi.string().required(),
        components: Joi.array()
      }
    }),
    async (req, res) => {
      req.body.components ??= [];
      try {
        const result = await service.addLab(req.body as INoIdLabDto);
        return created(res, result);
      } catch (e) {
        return StaticController.handleException(res, e);
      }
    }
  );

}