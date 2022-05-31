import IUserMapper from "./iMappers/iUserMapper";
import {Service} from "typedi";
import IUserDataModel from "../db/dataModel/iUserDataModel";
import User from "../domain/user/user";
import IUserDto from "../dto/iUserDto";
import UniqueEntityID from "../core/domain/uniqueEntityID";

@Service()
export default class UserMapper implements IUserMapper {

  dataModelToDTO(dataModel: IUserDataModel): IUserDto {
    return {
      domainId: dataModel.domainId,
      email: dataModel.email,
      password: dataModel.password
    };
  }

  domainToDTO(user: User): IUserDto {
    return {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value
    };
  }

  dtoToDataModel(dto: IUserDto): IUserDataModel {
    return {
      domainId: dto.domainId,
      email: dto.email,
      password: dto.password
    };
  }

  dtoToDomain(dto: IUserDto): User {
    return User.create(dto, new UniqueEntityID(dto.domainId));
  }

}