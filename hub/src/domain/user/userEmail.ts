import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";

interface UserEmailProps {
  value: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string): UserEmail {
    Guard.againstNullOrUndefined(email, `user e-mail`);
    Guard.isEmail(email);
    Guard.inRange(email.length, 1, 100, `user e-mail`);
    return new UserEmail({value: email});
  }

  get value(): string {
    return this.props.value;
  }

}