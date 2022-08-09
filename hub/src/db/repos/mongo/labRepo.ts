import {Inject, Service} from "typedi";

import {MongoRepo} from "../../../core/infra/repo";
import ILabDataModel from "../../dataModel/iLabDataModel";
import config from "../../../config";
import ILabMapper from "../../../mappers/iMappers/iLabMapper";
import labSchema from "./schemas/labSchema";
import ILabRepo from "../iRepos/iLabRepo";
import ILabDto from "../../../dto/iLabDto";

@Service()
export default class MongoLabRepo extends MongoRepo<ILabDataModel> implements ILabRepo {

  constructor(
    @Inject(config.deps.mappers.lab.name)
    private mapper: ILabMapper
  ) {
    super(labSchema);
  }

  async save(dto: ILabDto): Promise<ILabDto> {
    const labToPersist = this.mapper.dtoToDataModel(dto);
    const persistedLab = await this.persist(labToPersist);
    return this.mapper.dataModelToDTO(persistedLab);
  }

  async getByName(labName: string): Promise<ILabDto | null> {
    const labDataModel = await this.schema.findOne({name: labName});
    if (labDataModel === null) return null;
    return this.mapper.dataModelToDTO(labDataModel);
  }

  async getAllLabs(): Promise<ILabDto[]> {
    const dataModels = await this.schema.find();
    return dataModels.map(this.mapper.dataModelToDTO);
  }

  async getLabsByComponents(components: string[]): Promise<ILabDto[]> {
    const dataModels = await this.schema.find();
    if (dataModels === undefined || dataModels === null) return [];
    const ret: ILabDto[] = [];
    dataModels.forEach(dm => {
      // if every component is in the data model's list, it's added to ret list
      if (components.every(v => dm.components.includes(v)))
        ret.push(this.mapper.dataModelToDTO(dm));
    });
    return ret;
  }

  async getLabsByCountry(country: string): Promise<ILabDto[]> {
    const dataModels = await this.schema.find({country});
    return dataModels.map(this.mapper.dataModelToDTO);
  }

}
