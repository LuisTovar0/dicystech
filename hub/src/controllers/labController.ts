import {Router} from "express";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import {StaticController} from "../core/infra/baseController";
import ILabService from "../services/iServices/iLabService";
import config from "../config";
import INoIdLabDto from "../dto/iNoIdDto/iNoIdLabDto";

const {k, created, handleException} = StaticController;

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
        return handleException(res, e);
      }
    }
  );

  route.get('',
    async (req, res) => {
      try {
        const result = await service.getAllLabs();
        return k(res, result);
      } catch (e) {
        return handleException(res, e);
      }
    });

  route.get('/byname',
    celebrate({
      query: {name: Joi.string().required()}
    }),
    async (req, res) => {
      try {
        const result = await service.getLabByName(req.query.name as string);
        return k(res, result);
      } catch (e) {
        return handleException(res, e);
      }
    });

  route.get('/bycountry',
    celebrate({
      query: {country: Joi.string().required()}
    }),
    async (req, res) => {
      try {
        const result = await service.getLabsByCountry(req.query.country as string);
        return k(res, result);
      } catch (e) {
        return handleException(res, e);
      }
    });

  route.post('/getbycomponents',
    celebrate({
      body: Joi.array()
    }),
    async (req, res) => {
      try {
        const result = await service.getLabsByComponents(req.body as string[]);
        return k(res, result);
      } catch (e) {
        return handleException(res, e);
      }
    });

}