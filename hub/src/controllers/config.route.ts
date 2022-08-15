import {Router} from "express";
import {StaticController} from "../core/infra/baseController";
import {labCountries, robotComponents} from "../const";

const route = Router();

export default (app: Router) => {

  app.use('/config', route);

  route.get('/allcountries', (req, res) => StaticController.k(res, labCountries));

  route.get('/countrieswithlab', (req, res) => StaticController.k(res, [] as string[]));

  route.get('/robotcomponents', (req, res) => StaticController.k(res, robotComponents));

}
