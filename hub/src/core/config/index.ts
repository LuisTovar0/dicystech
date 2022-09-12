import dotenv from 'dotenv';
import {SignOptions} from "jsonwebtoken";
import {NamePathMap} from "../loaders/dependencyInjector";
import dbConfig from "./db";

const env = process.env.ENV || 'development';
// if the environment is production, env vars will be injected by Docker
if (['development', 'testing'].indexOf(env) !== -1 && !dotenv.config({path: '../.env.dev'}))
  throw new Error(`\u{26A0} Couldn't find .env file. It must be present in ${env} \u{26A0}`);

['HUB_PORT', 'HUB_ACCESS_TOKEN_SECRET', 'HUB_REFRESH_TOKEN_SECRET', 'HUB_DB_TYPE']
  .forEach(value => {
    if (!process.env[value]) throw new Error(`\u{26A0} ${value} environment variable must be defined \u{26A0}`);
  });

export default {

  env,

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
