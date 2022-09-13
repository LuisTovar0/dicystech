import IJsonLabDto from "./jsonDto/iJsonLabDto";
import WithId from "../core/infra/withId";

export default interface ILabDto extends IJsonLabDto, WithId {
}