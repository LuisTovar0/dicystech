import IJsonUserDto from "./jsonDto/iJsonUserDto";
import WithId from "../core/infra/withId";

export default interface IUserDto extends IJsonUserDto, WithId {
}