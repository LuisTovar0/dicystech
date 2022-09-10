import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import Logger from "./logger";
import {Express as Application} from "express";
import config from "../../config";
import {Container} from "typedi";
import IDb from "../../services/iRepos/iDb";

export default (expressApp: Application) => {

  setUpDependencyInjections();
  Logger.info('😎 All dependencies are loaded');

  const db = Container.get(config.db.generalConfig.name) as IDb;
  db.connect();

  expressLoader(expressApp);
  Logger.info('👊 Express loaded');

};
