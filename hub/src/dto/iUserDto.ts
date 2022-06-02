import INoIdUserDto from "./iNoIdDto/iNoIdUserDto";
import WithId from "../core/infra/withId";

export default interface IUserDto extends INoIdUserDto, WithId {
}