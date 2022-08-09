import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";

interface LabCountryProps {
  value: string;
}

export default class LabCountry extends ValueObject<LabCountryProps> {

  private constructor(props: LabCountryProps) {
    super(props);
  }

  public static create(country: string): LabCountry {
    Guard.isSupportedCountry(country);
    return new LabCountry({value: country});
  }

  get value(): string {
    return this.props.value;
  }

}
