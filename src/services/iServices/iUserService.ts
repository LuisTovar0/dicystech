import INoIdUserDto from "../../dto/iNoIdDto/iNoIdUserDto";
import IUserDto from "../../dto/iUserDto";
import AuthenticationResult from "../../dto/nonEntity/authenticationResult";

export default interface IUserService {

  addUser(userDto: INoIdUserDto): Promise<IUserDto>;

  updateUserPwd(email: string, newPwd: string): Promise<IUserDto>;

  verifyPassword(email: string, pwd: string): Promise<AuthenticationResult>;

}