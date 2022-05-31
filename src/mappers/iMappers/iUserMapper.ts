import BaseMapper from "../../core/infra/baseMapper";
import User from "../../domain/user/user";
import IUserDto from "../../dto/iUserDto";
import IUserDataModel from "../../db/dataModel/iUserDataModel";

export default interface IUserMapper extends BaseMapper<User, IUserDto, IUserDataModel> {
}