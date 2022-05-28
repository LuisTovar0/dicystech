import mongoose from 'mongoose';
import {Db} from 'mongodb';
import config, {MongoConfig} from "../../config";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect((config.db as MongoConfig).url);
  return connection.connection.db;
};
