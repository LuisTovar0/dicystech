import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config()) throw new Error("⚠️  Couldn't find .env file  ⚠️");
["LDAP_CONTAINER_NAME", "LDAP_ADMIN_PASSWORD", "LDAP_URLS"].forEach((env) => {
  if (!process.env[env]) throw new Error(`The "${env}" environment variable was not defined.`);
});

if (!process.env.LDAP_URLS) throw Error(`Unreachable code`);

export default {
  port: process.env.PORT || 3000,

  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  api: {prefix: '/api'},

  ldapContainerName: process.env.LDAP_CONTAINER_NAME,
  ldapUrls: process.env.LDAP_URLS.split(','),

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