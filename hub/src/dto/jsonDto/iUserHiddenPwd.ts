import WithId from "../../core/infra/withId";

export default interface IUserHiddenPassword extends WithId {
  email: string,
}