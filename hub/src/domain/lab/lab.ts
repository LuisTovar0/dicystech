import LabName from "./labName";
import LabCountry from "./labCountry";
import LabComponents from "./labComponents";
import {AggregateRoot} from "../../core/domain/aggregateRoot";
import UniqueEntityID from "../../core/domain/uniqueEntityID";
import INoIdLabDto from "../../dto/iNoIdDto/iNoIdLabDto";

interface LabProps {
  name: LabName;
  country: LabCountry;
  components: LabComponents;
}

export default class Lab extends AggregateRoot<LabProps> {

  private constructor(props: LabProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: INoIdLabDto, id?: UniqueEntityID): Lab {
    const name: LabName = LabName.create(dto.name);
    const country: LabCountry = LabCountry.create(dto.country);
    const components: LabComponents = LabComponents.create(dto.components);
    return new Lab({name, country, components}, id);
  }

  get name() {
    return this.props.name;
  }

  get country() {
    return this.props.country;
  }

  get components() {
    return this.props.components;
  }

}
