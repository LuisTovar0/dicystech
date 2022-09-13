import IJsonUserDto from "../../dto/jsonDto/iJsonUserDto";
import IAuthenticationResult from "../../dto/jsonDto/iAuthenticationResult";
import IUserHiddenPassword from "../../dto/jsonDto/iUserHiddenPwd";

export default interface IUserService {

  getUserHidePwd(searchEmail: string): Promise<IUserHiddenPassword>;

  addUser(userDto: IJsonUserDto): Promise<IUserHiddenPassword>;

  updateUserPwd(email: string, newPwd: string): Promise<IUserHiddenPassword>;

  verifyPassword(email: string, pwd: string): Promise<IAuthenticationResult>;

}