import axios, {AxiosResponse} from 'axios';

import IUserService from "./iServices/iUserService";
import CreateAccountDto from "../dto/user/createAccountDto";
import config from "../config";

export interface AxiosCallbacks<RespT> {
  then?: (result: AxiosResponse<RespT>) => void,
  catchEx?: (reason: any) => void
}

export default class UserService implements IUserService {

  static readonly baseUrl = `/api/user`;

  register(info: CreateAccountDto, callbacks?: AxiosCallbacks<string>): void {
    axios.post<string>(config.backendUrl + UserService.baseUrl, info)
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

  login(email: string, password: string, callbacks?: AxiosCallbacks<string>): void {
    axios.post<string>(`${config.backendUrl + UserService.baseUrl}/authenticate`, {email, password})
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

  refreshToken(callbacks?: AxiosCallbacks<string>): void {
    axios.get<string>(`${config.backendUrl + UserService.baseUrl}/refreshToken`)
      .then(r => {
        config.accessJwt = r.data;
        if (callbacks && callbacks.then)
          callbacks?.then(r);
      }).catch(callbacks?.catchEx);
  }

  requestWithAuth<T>(req: (accessJwt: string, callbacks?: AxiosCallbacks<T>) => void, callbacks?: AxiosCallbacks<T>): void {
    const refreshTokenAndTryRequest = () =>
      this.refreshToken({
        then: ({data}) => req(data),
        catchEx: callbacks?.catchEx
      });

    if (!config.accessJwt)
      refreshTokenAndTryRequest();
    else req(config.accessJwt, {
      ...callbacks,
      catchEx: refreshTokenAndTryRequest
    });
  }

}
