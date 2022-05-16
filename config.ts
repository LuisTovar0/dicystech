import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config()) throw new Error("⚠️  Couldn't find .env file  ⚠️");
if (!process.env.LDAP_CONTAINER_NAME || !process.env.LDAP_ADMIN_PASSWORD || !process.env.LDAP_URLS)
  throw Error(`There is one or more undefined environment variables.`);

export default {
  port: process.env.PORT || 3000,

  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  api: {prefix: '/api'},

  ldap: {
    containerName: process.env.LDAP_CONTAINER_NAME,
    adminPwd: process.env.LDAP_ADMIN_PASSWORD,
    urls: process.env.LDAP_URLS.split(','),
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