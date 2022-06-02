import UserEmail from "./userEmail";
import UserPassword from "./UserPassword";
import {AggregateRoot} from "../../core/domain/aggregateRoot";
import UniqueEntityID from "../../core/domain/uniqueEntityID";
import INoIdUserDto from "../../dto/iNoIdDto/iNoIdUserDto";

interface UserProps {
  email: UserEmail,
  password: UserPassword
}

export default class User extends AggregateRoot<UserProps> {

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: INoIdUserDto, id?: UniqueEntityID): User {
    const email: UserEmail = UserEmail.create(dto.email);
    const password: UserPassword = UserPassword.create(dto.password);
    return new User({email, password}, id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

}