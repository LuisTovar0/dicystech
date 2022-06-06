import WithId from "../../core/infra/withId";

export default interface AuthenticationResult extends WithId {
  passwordIsCorrect: boolean,
}