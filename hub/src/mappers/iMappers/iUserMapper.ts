import BaseMapper from "../../core/infra/baseMapper";
import User from "../../domain/user/user";
import IUserDto from "../../dto/iUserDto";
import IUserDataModel from "../../db/dataModel/iUserDataModel";
import IUserHiddenPassword from "../../dto/jsonDto/iUserHiddenPwd";

export default interface IUserMapper extends BaseMapper<User, IUserDto, IUserDataModel> {

  dtoToHiddenPwdDto(dto: IUserDto): IUserHiddenPassword;

}