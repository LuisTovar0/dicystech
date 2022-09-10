import INoIdUserDto from "../../dto/iNoIdDto/iNoIdUserDto";
import AuthenticationResult from "../../dto/nonEntity/authenticationResult";
import IUserHiddenPassword from "../../dto/iUserHiddenPwd";

export default interface IUserService {

  getUserHidePwd(searchEmail: string): Promise<IUserHiddenPassword>;

  addUser(userDto: INoIdUserDto): Promise<IUserHiddenPassword>;

  updateUserPwd(email: string, newPwd: string): Promise<IUserHiddenPassword>;

  verifyPassword(email: string, pwd: string): Promise<AuthenticationResult>;

}