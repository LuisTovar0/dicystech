import {AxiosCallbacks} from "../userService";
import CreateAccountDto from "../../dto/user/createAccountDto";

export default interface IUserService {

  refreshToken(callbacks?: AxiosCallbacks<string>): void;

  login(email: string, password: string, callbacks?: AxiosCallbacks<string>): void;

  register(info: CreateAccountDto, callbacks?: AxiosCallbacks<string>): void;

  requestWithAuth<T>(req: (accessJwt: string, callbacks?: AxiosCallbacks<T>) => void, callbacks?: AxiosCallbacks<T>): void;

}