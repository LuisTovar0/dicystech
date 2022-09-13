import WithId from "../../core/infra/withId";

export default interface IAuthenticationResult extends WithId {
  passwordIsCorrect: boolean,
}