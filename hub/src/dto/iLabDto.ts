import WithId from "../core/infra/withId";
import INoIdLabDto from "./noIdDto/iNoIdLabDto";

export default interface ILabDto extends INoIdLabDto, WithId {
}