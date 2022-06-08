import axios, {AxiosResponse} from 'axios';
import {Service} from 'typedi';

import IUserService from "./iServices/iUserService";
import RegisterDto from "../dto/registerDto";
import config from "../configs/config";

export interface AxiosCallbacks<RespT> {
  then?: (result: AxiosResponse<RespT>) => void,
  catchEx?: (reason: any) => void
}

@Service()
export default class UserService implements IUserService {

  register(info: RegisterDto, callbacks?: AxiosCallbacks<string>): void {
    axios.post<string>(config.backendUrl + '/api/user', info)
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

  login(email: string, password: string, callbacks?: AxiosCallbacks<string>): void {
    axios.post<string>(config.backendUrl + '/api/user/authenticate', {email, password})
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

  refreshToken(callbacks?: AxiosCallbacks<string>): void {
    axios.get<string>(config.backendUrl + '/api/user/refreshToken')
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

}