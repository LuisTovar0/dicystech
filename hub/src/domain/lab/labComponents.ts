import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";

interface LabComponentsProps {
  value: string[];
}

export default class LabComponents extends ValueObject<LabComponentsProps> {

  private constructor(props: LabComponentsProps) {
    super(props);
  }

  public static create(components: string[]) {
    Guard.isSupportedRobotComponentList(components);
    return new LabComponents({value: components});
  }

  get value() {
    return this.props.value;
  }

}