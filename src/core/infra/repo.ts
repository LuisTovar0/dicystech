import {Model} from "mongoose";

import DataModel from "./dataModel";
import {ValidationError} from "../logic/errors";

export class MongoRepo<TDataModel extends DataModel> {

  constructor(protected schema: Model<TDataModel>) {
  }

  protected async findByDomainId(id: string): Promise<TDataModel | null> {
    return this.schema.findOne({domainId: id});
  }

  protected async persist(t: TDataModel): Promise<TDataModel> {
    const existingDataModel = await this.findByDomainId(t.domainId);
    if (existingDataModel !== null)
      throw new ValidationError('ID ' + t.domainId + ' already exists.');
    return await this.schema.create(t);
  }

}