import {ValueObject} from "../../core/domain/valueObject";
import {ValidationError} from "../../core/logic/errors";

interface LabNameProps {
  value: string;
}

export default class LabName extends ValueObject<LabNameProps> {

  private constructor(props: LabNameProps) {
    super(props);
  }

  public static create(name: string): LabName {
    if (name.includes('/'))
      throw new ValidationError(`The Lab name has an invalid character: "/"`)
    return new LabName({value: name});
  }

  get value(): string {
    return this.props.value;
  }

}
