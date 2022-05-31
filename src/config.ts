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
    if (!process.env.LDAP_ADMIN_PASSWORD || !process.env.LDAP_ORGANISATION ||
      !process.env.LDAP_DOMAIN || !process.env.LDAP_URLS)
      throw new Error(`There is one or more undefined environment variables.`);
    const orgDomain = process.env.LDAP_DOMAIN.trim();
    const domRegex = /^((?!-))(xn--)?[a-z\d][a-z\d-_]{0,61}[a-z\d]?\.(xn--)?([a-z\d\-]{1,61}|[a-z\d-]{1,30}\.[a-z]{2,})$/;
    if (!domRegex.test(orgDomain)) throw new Error('The provided organization domain is not valid.');
    dbConfig = {
      adminPwd: process.env.LDAP_ADMIN_PASSWORD.trim(),
      orgName: process.env.LDAP_ORGANISATION.trim(),
      urls: process.env.LDAP_URLS.trim().split(','),
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
    if (!process.env.MONGODB_URL)
      throw new Error(`There is one or more undefined environment variables.`);
    dbConfig = {
      url: `mongodb://${process.env.MONGODB_URL}`,
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
  port: process.env.PORT || 3000,

  api: {prefix: '/api'},

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
