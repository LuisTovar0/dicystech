import {ValueObject} from "../../core/domain/valueObject";

interface LabNameProps {
  value: string;
}

export default class LabName extends ValueObject<LabNameProps> {

  private constructor(props: LabNameProps) {
    super(props);
  }

  public static create(name: string): LabName {
    return new LabName({value: name});
  }

  get value(): string {
    return this.props.value;
  }

}
