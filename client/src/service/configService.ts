import axios from "axios";

import config from "../config";
import IConfigService from "./iServices/iConfigService";
import {AxiosCallbacks} from "./userService";

export default class ConfigService implements IConfigService {

  private readonly apiPath = '/api/config';

  constructor() {
    axios.get(`${config.backendUrl}/status`)
      .then(({data}) => console.log('Back-end status', data))
      .catch(r => console.log('Back-end status check failed', r));
  }

  getLabCountries(callbacks?: AxiosCallbacks<string[]>): void {
    axios.get<string[]>(`${config.backendUrl + this.apiPath}/countrieswithlab`)
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

  getLabSupportedCountries(callbacks?: AxiosCallbacks<string[]>): void {
    axios.get<string[]>(`${config.backendUrl + this.apiPath}/allcountries`)
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

  getRobotSupportedComponents(callbacks?: AxiosCallbacks<string[]>): void {
    axios.get<string[]>(`${config.backendUrl + this.apiPath}/robotcomponents`)
      .then(callbacks?.then).catch(callbacks?.catchEx);
  }

}
