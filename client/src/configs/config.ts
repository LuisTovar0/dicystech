import {NamePathMap} from "./dependencyInjector";
import UserService from "../service/userService";

const config = {
  backendUrl: process.env.REACT_APP_BE_URL as string,

  accessJwt: undefined as string | undefined,

  deps: {
    services: {
      user: {
        name: 'UserService',
        path: '../service/userService'
      }
    } as NamePathMap,
    mappers: {} as NamePathMap
  }
};

export default config;
