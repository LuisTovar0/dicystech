import ILabDto from "../../dto/iLabDto";

export default interface ILabRepo {

  save(dto: ILabDto): Promise<ILabDto>;

  getByName(labName: string): Promise<ILabDto | null>;

  getLabsByCountry(country: string): Promise<ILabDto[]>;

  getAllLabs(): Promise<ILabDto[]>;

  getLabsByComponents(components: string[]): Promise<ILabDto[]>;

}