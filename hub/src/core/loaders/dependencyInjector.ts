import {Container} from 'typedi';
import Logger from './logger';
import config from "../config";

export interface NamePathMap {
  [k: string]: NamePath;
}

export interface NamePath {
  name: string,
  path: string
}

export default () => {
  try {
    Container.set('logger', Logger);

    // a class can only be set after its own dependencies are set
    [
      config.deps.mappers,  // can only depend on each other (must be ordered)
      config.db.deps,       // repos and infrastructures, depend on mappers
      config.deps.services, // depend on repos and on each other (must be ordered)
      {_: config.db.generalConfig}
    ].forEach((deps) => {
      Object.entries(deps).forEach(([, dep]) => {
        // load the @Service() class by its path
        let class_ = require(dep.path).default;
        // create/get the instance of the @Service() class
        let classInstance = Container.get(class_);
        // rename the instance inside the container
        Container.set(dep.name, classInstance);
        Logger.info('👌 ' + dep.name + ' loaded');
      });
    });

  } catch (e) {
    Logger.error(`🔥 Error on dependency injector loader!`);
    throw e;
  }
};
