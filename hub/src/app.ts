import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';

import config from './config';
import Logger from './core/loaders/logger';

Logger.info(`🤙 Bootin' up`);
const app = express();

require('./core/loaders').default(app);

app.listen(config.api.port, () => Logger.info(`
         #####################################
         🛡️  Server listening on port: ${config.api.port} 🛡️ 
         #####################################
  `)).on('error', err => {
  Logger.error(err);
  process.exit(1);
});
