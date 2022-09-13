import ILabService from "./iServices/iLabService";
import INoIdLabDto from "../dto/lab/iNoIdLabDto";
import ILabDto from "../dto/lab/iLabDto";
import {AxiosCallbacks} from "./userService";
import axios from "axios";
import config from "../config";
import IUserService from "./iServices/iUserService";

export default class LabService implements ILabService {

  static readonly baseUrl = `/api/lab`;

  constructor(private userService: IUserService) {
  }

  addRobotLab(dto: INoIdLabDto, callbacks: AxiosCallbacks<ILabDto>): void {
    this.userService.requestWithAuth<ILabDto>(
      (accessJwt: string, cbs?: AxiosCallbacks<ILabDto>) =>
        axios.post<ILabDto>(config.backendUrl + LabService.baseUrl, dto,
          {headers: {authorization: accessJwt}})
          .then(cbs?.then).catch(cbs?.catchEx),
      callbacks);
  }

  getAllLabs(callbacks: AxiosCallbacks<ILabDto[]>): void {
    this.userService.requestWithAuth(
      (accessJwt: string, cbs?: AxiosCallbacks<ILabDto[]>) =>
        axios.get<ILabDto[]>(config.backendUrl + LabService.baseUrl,
          {headers: {authorization: accessJwt}})
          .then(cbs?.then).catch(cbs?.catchEx),
      callbacks);
  }

  getLabByName(name: string, callbacks: AxiosCallbacks<ILabDto>): void {
    this.userService.requestWithAuth(
      (accessJwt: string, cbs?: AxiosCallbacks<ILabDto>) =>
        axios.get<ILabDto>(`${config.backendUrl + LabService.baseUrl}/${name}`,
          {headers: {authorization: accessJwt}})
          .then(cbs?.then).catch(cbs?.catchEx),
      callbacks);
  }

  getLabsByComponents(components: string[], callbacks: AxiosCallbacks<ILabDto[]>): void {
    this.userService.requestWithAuth((accessJwt: string) =>
        axios.post<ILabDto[]>(`${config.backendUrl + LabService.baseUrl}/bycomponents`, components,
          {headers: {authorization: accessJwt}})
          .then(callbacks.then).catch(callbacks.catchEx),
      callbacks);
  }

  getLabsByCountry(country: string, callbacks: AxiosCallbacks<ILabDto[]>): void {
    this.userService.requestWithAuth(
      (accessJwt: string, cbs?: AxiosCallbacks<ILabDto[]>) =>
        axios.get<ILabDto[]>(`${config.backendUrl + LabService.baseUrl}/bycountry/${country}`,
          {headers: {authorization: accessJwt}})
          .then(cbs?.then).catch(cbs?.catchEx),
      callbacks);
  }

}
