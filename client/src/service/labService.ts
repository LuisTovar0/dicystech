import ILabService from "./iServices/iLabService";
import INoIdLabDto from "../dto/lab/iNoIdLabDto";
import ILabDto from "../dto/lab/iLabDto";
import {AxiosCallbacks} from "./userService";
import axios from "axios";
import config from "../configs/config";

export default class LabService implements ILabService {

  static readonly baseUrl = `/api/lab`;

  addRobotLab(dto: INoIdLabDto, callbacks: AxiosCallbacks<ILabDto>): void {
    axios.post<ILabDto>(config.backendUrl + LabService.baseUrl, dto)
      .then(callbacks.then).catch(callbacks.catchEx);
  }

  getAllLabs(callbacks: AxiosCallbacks<ILabDto[]>): void {
    axios.get<ILabDto[]>(config.backendUrl + LabService.baseUrl)
      .then(callbacks.then).catch(callbacks.catchEx);
  }

  getLabByName(name: string, callbacks: AxiosCallbacks<ILabDto>): void {
    axios.get<ILabDto>(`${config.backendUrl + LabService.baseUrl}/${name}`)
      .then(callbacks.then).catch(callbacks.catchEx);
  }

  getLabsByComponents(components: string[], callbacks: AxiosCallbacks<ILabDto[]>): void {
    axios.post<ILabDto[]>(`${config.backendUrl + LabService.baseUrl}/bycomponents`, components)
      .then(callbacks.then).catch(callbacks.catchEx);
  }

  getLabsByCountry(country: string, callbacks: AxiosCallbacks<ILabDto[]>): void {
    axios.get<ILabDto[]>(`${config.backendUrl + LabService.baseUrl}/bycountry/${country}`)
      .then(callbacks.then).catch(callbacks.catchEx);
  }

}
