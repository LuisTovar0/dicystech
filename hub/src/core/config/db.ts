import {NamePath, NamePathMap} from "../loaders/dependencyInjector";
import logger from "../loaders/logger";

interface DbConfig {
  type: string;
  deps: NamePathMap;
  generalConfig: NamePath;
  connected: boolean;
}

export interface LdapConfig extends DbConfig {
  adminPwd: string;
  orgDomain: string;
  urls: string[];
  orgName: string;
}

export interface MongoConfig extends DbConfig {
  url: string;
}

const dbConfig = () => {
  const type = process.env.HUB_DB_TYPE;
  if (!type) throw `DB_TYPE environment variable must be defined`;
  let dbConfig: LdapConfig | MongoConfig;
  switch (type) {
    case "ldap":
      const orgDomain = (process.env.LDAP_DOMAIN as string).trim();
      const domRegex = /^((?!-))(xn--)?[a-z\d][a-z\d-_]{0,61}[a-z\d]?\.(xn--)?([a-z\d\-]{1,61}|[a-z\d-]{1,30}\.[a-z]{2,})$/;
      if (!domRegex.test(orgDomain))
        throw new Error('The provided organization domain is not valid.');
      dbConfig = {
        type,
        connected: false,
        adminPwd: (process.env.LDAP_ADMIN_PASSWORD as string).trim(),
        orgName: (process.env.LDAP_ORGANISATION as string).trim(),
        urls: (process.env.HUB_LDAP_URLS as string).trim().split(','),
        orgDomain,
        deps: {},
        generalConfig: {
          name: 'LdapGeneralConfig',
          path: '../../db/repos/ldap/ldapGeneralConfig'
        }
      } as LdapConfig;
      break;
    case "mongo":
      if (!process.env.HUB_MONGODB_URL)
        logger.error(`A HUB_MONGODB_URL environment variable should be defined.`);
      dbConfig = {
        type,
        url: 'mongodb://' + (process.env.HUB_MONGODB_URL || 'mongo:27017'),
        connected: false,
        generalConfig: {
          name: 'MongoGeneralConfig',
          path: '../../db/repos/mongo/mongoGeneralConfig'
        },
        deps: {
          user: {
            name: 'MongoUserRepo',
            path: '../../db/repos/mongo/userRepo'
          },
          lab: {
            name: 'MongoLabRepo',
            path: '../../db/repos/mongo/labRepo'
          }
        }
      } as MongoConfig;
      break;
    default:
      throw `Invalid DB type: ${type}`;
  }
  return dbConfig;
};

export default dbConfig;
