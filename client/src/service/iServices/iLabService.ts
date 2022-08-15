import INoIdLabDto from "../../dto/lab/iNoIdLabDto";
import {AxiosCallbacks} from "../userService";
import ILabDto from "../../dto/lab/iLabDto";

export default interface ILabService {

  addLab(dto: INoIdLabDto, callbacks: AxiosCallbacks<ILabDto>): void;

  getAllLabs(callbacks: AxiosCallbacks<ILabDto[]>): void;

  getLabByName(name: string, callbacks: AxiosCallbacks<ILabDto>): void;

  getLabsByCountry(country: string, callbacks: AxiosCallbacks<ILabDto[]>): void;

  getLabsByComponents(components: string[], callbacks: AxiosCallbacks<ILabDto[]>): void;

}
