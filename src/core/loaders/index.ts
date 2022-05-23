import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import Logger from "./logger";
import {Application} from 'express';

export default (expressApp: Application) => {

  setUpDependencyInjections();
  Logger.info('😎 All dependencies are loaded');

  expressLoader(expressApp);
  Logger.info('👊 Express loaded');

};
