// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV ??= 'development';

import dotenv from 'dotenv';
import logger from "./src/core/loaders/logger";

const env = process.env.ENV || 'development';
let envFile: string;
if (['development', 'testing'].indexOf(env) !== -1) envFile = '.env';
else if (env === 'production') envFile = '.env.prod';
else {
  logger.error('Invalid environment: must be production, testing or development.');
  process.exit(1);
}

if (!dotenv.config({path: envFile}))
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
if (!process.env.LDAP_ADMIN_PASSWORD || !process.env.LDAP_ORG_NAME || !process.env.LDAP_ORG_DOMAIN || !process.env.LDAP_URLS)
  throw new Error(`There is one or more undefined environment variables.`);

const orgDomain = process.env.LDAP_ORG_DOMAIN.trim();
const domRegex = /^((?!-))(xn--)?[a-z\d][a-z\d-_]{0,61}[a-z\d]?\.(xn--)?([a-z\d\-]{1,61}|[a-z\d-]{1,30}\.[a-z]{2,})$/;
if (!domRegex.test(orgDomain))
  throw new Error('The provided organization domain is not valid.');

export default {
  port: process.env.PORT || 3000,

  api: {prefix: '/api'},

  ldap: {
    adminPwd: process.env.LDAP_ADMIN_PASSWORD.trim(),
    orgName: process.env.LDAP_ORG_NAME.trim(),
    orgDomain,
    urls: process.env.LDAP_URLS.trim().split(','),
  },

  deps: {
    repos: {
      product: {
        name: 'ProductRepo',
        path: '../../db/repos/productRepo'
      }
    },
    services: {
      product: {
        name: 'ProductService',
        path: '../../services/productService'
      },
      ldap: {
        name: 'LdapService',
        path: '../../services/ldapService'
      }
    },
    mappers: {
      product: {
        name: 'ProductMapper',
        path: '../../mappers/productMapper'
      }
    },
    schemas: {
      product: {
        name: 'ProductSchema',
        path: '../../db/schemas/productSchema',
      }
    }
  }
};