import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config()) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  port: process.env.PORT || 3000,

  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  api: {prefix: '/api',},

  ldapContainerName: process.env.LDAP_CONTAINER_NAME,

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
      name: 'WinDockerLdapService',
      path: '../../services/winDockLdapService'
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
};
