import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";

interface UserPasswordProps {
  value: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public static create(password: string): UserPassword {
    Guard.againstNullOrUndefined(password, 'user password');
    Guard.sha256hash(password, `user password`);
    return new UserPassword({value: password});
  }

  get value(): string {
    return this.props.value;
  }

}
