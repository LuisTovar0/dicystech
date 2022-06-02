import mongoose from "./mongoose";
import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import Logger from "./logger";
import {Application} from 'express';
import config from "../../config";

export default (expressApp: Application) => {

  if (config.dbType === `mongo`) {
    mongoose();
  }

  setUpDependencyInjections();
  Logger.info('😎 All dependencies are loaded');

  expressLoader(expressApp);
  Logger.info('👊 Express loaded');

};
