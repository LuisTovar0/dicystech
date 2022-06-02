import {Container} from "typedi";
import config from "./config";

export interface NamePath {
  name: string,
  path: string
}

export interface NamePathMap {
  [k: string]: NamePath;
}

export default ()=>{
  try {
    // a class can only be set after its own dependencies are set
    [config.deps.mappers,   // can only depend on each other (must be ordered)
      config.deps.services  // depend on repos and on each other (must be ordered)
    ].forEach((deps) => {
      Object.entries(deps).forEach(([, dep]) => {
        // load the @Service() class by its path
        let class_ = require(dep.path).default;
        // create/get the instance of the @Service() class
        let classInstance = Container.get(class_);
        // rename the instance inside the container
        Container.set(dep.name, classInstance);
        console.log(`loaded ${dep.name}`)
      });
    });

  } catch (e) {
    throw e;
  }
}