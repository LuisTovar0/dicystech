import mongoose from 'mongoose';
import {Db} from 'mongodb';
import config, {MongoConfig} from "../../config";
import logger from "./logger";
import {sleep} from "../../services/utils";

async function connectMongo(): Promise<Db> {
  try {
    const connection = await mongoose.connect((config.db as MongoConfig).url);
    logger.info(`🔧 Connected to the MongoDB database`);
    (config.db as MongoConfig).connected = true;
    return connection.connection.db;
  } catch (e) {
    logger.error(`Could not connect to MongoDB: ${e.message}`);
    await sleep(5000, true);
    return await connectMongo();
  }
}

export default connectMongo;
