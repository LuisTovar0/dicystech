import INoIdLabDto from "../../dto/iNoIdDto/iNoIdLabDto";
import ILabDto from "../../dto/iLabDto";

export default interface ILabService {

  addLab(labDto: INoIdLabDto): Promise<ILabDto>;

  getLabByName(name: string): Promise<ILabDto>;

  getLabsByCountry(country: string): Promise<ILabDto[]>;

  getAllLabs(): Promise<ILabDto[]>;

  getLabsByComponents(components: string[]): Promise<ILabDto[]>;

}