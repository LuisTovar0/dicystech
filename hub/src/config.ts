import dotenv from 'dotenv';
import logger from "./core/loaders/logger";
import {NamePathMap} from "./core/loaders/dependencyInjector";

const env = process.env.ENV || 'development';
let envFile: string;
if (['development', 'testing'].indexOf(env) !== -1) envFile = '.env';
else if (env === 'production') envFile = 'prod.env';
else {
  logger.error('Invalid environment: must be production, testing or development.');
  process.exit(1);
}

if (!dotenv.config({path: envFile})) throw new Error("⚠️  Couldn't find .env file  ⚠️");
const dbType = process.env.DB_TYPE;
if (!dbType) throw `DB_TYPE environment variable must be defined`;
let dbConfig: LdapConfig | MongoConfig;
switch (dbType) {
  case "ldap":
    const orgDomain = (process.env.LDAP_DOMAIN as string).trim();
    const domRegex = /^((?!-))(xn--)?[a-z\d][a-z\d-_]{0,61}[a-z\d]?\.(xn--)?([a-z\d\-]{1,61}|[a-z\d-]{1,30}\.[a-z]{2,})$/;
    if (!domRegex.test(orgDomain)) throw new Error('The provided organization domain is not valid.');
    dbConfig = {
      adminPwd: (process.env.LDAP_ADMIN_PASSWORD as string).trim(),
      orgName: (process.env.LDAP_ORGANISATION as string).trim(),
      urls: (process.env.LDAP_URLS as string).trim().split(','),
      orgDomain,
      deps: {
        ldap: {
          name: 'Ldap',
          path: './ldap'
        },
      }
    } as LdapConfig;
    break;
  case"mongo":
    if (!process.env.MONGODB_URL) logger.error(`You should define a MONGODB_URL environment variable.`);
    dbConfig = {
      url: 'mongodb://' + (process.env.MONGODB_URL || 'mongo:27017'),
      connected: false,
      deps: {
        user: {
          name: 'MongoUserRepo',
          path: '../../db/repos/mongo/userRepo'
        }
      }
    } as MongoConfig;
    break;
  default:
    throw `Invalid DB type: ${dbType}`;
}

export default {

  api: {
    prefix: '/api',
    port: Number(process.env.PORT) || 4000,
    jwt: {
      accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET as string
    }
  },

  dbType,
  db: dbConfig,

  deps: {
    services: {
      user: {
        name: 'UserService',
        path: '../../services/userService'
      }
    } as NamePathMap,
    mappers: {
      user: {
        name: 'UserMapper',
        path: '../../mappers/userMapper'
      }
    } as NamePathMap
  }
};

export interface LdapConfig {
  adminPwd: string,
  orgDomain: string,
  deps: NamePathMap,
  urls: string[],
  orgName: string,
}

export interface MongoConfig {
  url: string,
  connected: boolean,
  deps: NamePathMap,
}
