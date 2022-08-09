import INoIdLabDto from "./iNoIdDto/iNoIdLabDto";
import WithId from "../core/infra/withId";

export default interface ILabDto extends INoIdLabDto, WithId {
}