import IUserDto from "../../dto/iUserDto";

export default interface IUserRepo {

  save(dto: IUserDto): Promise<IUserDto>;

  getByEmail(email: string): Promise<IUserDto | null>;

}