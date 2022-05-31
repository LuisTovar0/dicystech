import {Inject, Service} from "typedi";

import config from "../../../config";
import {MongoRepo} from "../../../core/infra/repo";
import IUserDto from "../../../dto/iUserDto";
import IUserMapper from "../../../mappers/iMappers/iUserMapper";
import IUserDataModel from "../../dataModel/iUserDataModel";
import userSchema from "../mongo/schemas/userSchema";
import IUserRepo from "../iRepos/iUserRepo";
import {NotFoundError} from "../../../core/logic/errors";


@Service()
export default class MongoUserRepo extends MongoRepo<IUserDataModel> implements IUserRepo {

  constructor(
    @Inject(config.deps.mappers.user.name)
    private mapper: IUserMapper
  ) {
    super(userSchema);
  }

  async save(dto: IUserDto): Promise<IUserDto> {
    const userToPersist = this.mapper.dtoToDataModel(dto);
    const persistedUser = await this.persist(userToPersist);
    return this.mapper.dataModelToDTO(persistedUser);
  }

  async getByEmail(userEmail: string): Promise<IUserDto> {
    const userDataModel = await this.schema.findOne({email: userEmail});
    if (userDataModel === null) throw new NotFoundError(`Product with the e-mail ${userEmail} does not exist.`);
    return this.mapper.dataModelToDTO(userDataModel);
  }

}