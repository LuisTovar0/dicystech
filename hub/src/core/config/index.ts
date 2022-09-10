import dotenv from 'dotenv';
import {SignOptions} from "jsonwebtoken";
import {NamePathMap} from "../loaders/dependencyInjector";
import dbConfig from "./db";

const env = process.env.ENV || 'development';
if (['development', 'testing'].indexOf(env) !== -1 && !dotenv.config())
  throw new Error(`⚠️  Couldn't find .env file. It must be present in ${env} ⚠️`);

export default {

  api: {
    prefix: '/api',
    port: Number(process.env.HUB_PORT) || 4000,
    jwt: {
      accessSecret: process.env.HUB_ACCESS_TOKEN_SECRET as string,
      refreshSecret: process.env.HUB_REFRESH_TOKEN_SECRET as string,
      signOptions: {noTimestamp: true} as SignOptions
    }
  },

  db: dbConfig(),

  deps: {
    services: {
      user: {
        name: 'UserService',
        path: '../../services/userService'
      },
      lab: {
        name: 'LabService',
        path: '../../services/labService'
      }
    } as NamePathMap,
    mappers: {
      user: {
        name: 'UserMapper',
        path: '../../mappers/userMapper'
      },
      lab: {
        name: 'LabMapper',
        path: '../../mappers/labMapper'
      }
    } as NamePathMap
  }
};

export {MongoConfig, LdapConfig} from './db';
