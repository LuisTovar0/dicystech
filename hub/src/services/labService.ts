import {Inject, Service} from "typedi";

import config from "../core/config";
import ILabService from "../controllers/iServices/iLabService";
import ILabRepo from "./iRepos/iLabRepo";
import ILabMapper from "../mappers/iMappers/iLabMapper";
import ILabDto from "../dto/iLabDto";
import IJsonLabDto from "../dto/jsonDto/iJsonLabDto";
import {NotFoundError} from "../core/logic/errors";
import Lab from "../domain/lab/lab";
import LabCountry from "../domain/lab/labCountry";
import LabComponents from "../domain/lab/labComponents";

@Service()
export default class LabService implements ILabService {

  constructor(
    @Inject(config.db.deps.lab.name)
    private repo: ILabRepo,
    @Inject(config.deps.mappers.lab.name)
    private mapper: ILabMapper
  ) {
  }

  async addLab(labDto: IJsonLabDto): Promise<ILabDto> {
    const lab = Lab.create(labDto);
    return await this.repo.save(this.mapper.domainToDTO(lab));
  }

  async getLabByName(name: string): Promise<ILabDto> {
    const lab = await this.repo.getByName(name);
    if (lab === null)
      throw new NotFoundError(`Lab with name "${name}" does not exist.`);
    return lab;
  }

  async getAllLabs(): Promise<ILabDto[]> {
    return await this.repo.getAllLabs();
  }

  async getLabsByComponents(components: string[]): Promise<ILabDto[]> {
    LabComponents.create(components);
    return await this.repo.getLabsByComponents(components);
  }

  async getLabsByCountry(country: string): Promise<ILabDto[]> {
    LabCountry.create(country);
    return await this.repo.getLabsByCountry(country);
  }

}
