import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import Logger from "./logger";
import {Express as Application} from "express";
import config from "../config";
import {Container} from "typedi";
import IDbGeneralConfig from "../../services/iRepos/IDbGeneralConfig";

export default (expressApp: Application) => {

  setUpDependencyInjections();
  Logger.info('😎 All dependencies are loaded');

  const db = Container.get(config.db.generalConfig.name) as IDbGeneralConfig;
  db.connect();

  expressLoader(expressApp);
  Logger.info('👊 Express loaded');

};
