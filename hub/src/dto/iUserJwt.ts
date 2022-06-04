import IUserHiddenPassword from "./iUserHiddenPwd";

export default interface IUserJwt extends IUserHiddenPassword {
  jwtToken: string;
}