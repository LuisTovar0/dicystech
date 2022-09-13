import WithId from "../core/infra/withId";
import INoIdUserDto from "./noIdDto/iNoIdUserDto";

export default interface IUserDto extends INoIdUserDto, WithId {
}