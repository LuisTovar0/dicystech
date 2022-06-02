import RegisterDto from "../../dto/registerDto";
import {AxiosCallbacks} from "../userService";
import UserHiddenPwd from "../../dto/userHiddenPwd";

export default interface IUserService {
  register(info: RegisterDto, callbacks?:AxiosCallbacks<UserHiddenPwd> ):void
}