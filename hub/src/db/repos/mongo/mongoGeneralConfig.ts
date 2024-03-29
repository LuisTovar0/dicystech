import {Service} from "typedi";
import mongoose from 'mongoose';
import {Db} from 'mongodb';

import IDbGeneralConfig from "../../../services/iRepos/IDbGeneralConfig";
import logger from "../../../core/loaders/logger";
import config, {MongoConfig} from "../../../core/config";
import {sleep} from "../../../services/utils";

@Service()
export default class MongoGeneralConfig implements IDbGeneralConfig {

  connect(): void {
    this.connectMongo();
  }

  async connectMongo(): Promise<Db> {
    try {
      const connection = await mongoose.connect((config.db as MongoConfig).url);
      logger.info(`🔧 Connected to the MongoDB database`);
      (config.db as MongoConfig).connected = true;
      return connection.connection.db;
    } catch (e) {
      logger.error(`Could not connect to MongoDB: ${e.message}`);
      await sleep(5000, true);
      return await this.connectMongo();
    }
  }

}