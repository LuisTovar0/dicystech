import {Service} from "typedi";
import ILabMapper from "./iMappers/iLabMapper";
import ILabDto from "../dto/iLabDto";
import ILabDataModel from "../db/dataModel/iLabDataModel";
import Lab from "../domain/lab/lab";
import UniqueEntityID from "../core/domain/uniqueEntityID";

@Service()
export default class LabMapper implements ILabMapper {

  dataModelToDTO({domainId, name, country, components}: ILabDataModel): ILabDto {
    return {domainId, name, country, components};
  }

  domainToDTO(lab: Lab): ILabDto {
    return {
      domainId: lab.id.toString(),
      name: lab.name.value,
      country: lab.country.value,
      components: lab.components.value
    };
  }

  dtoToDataModel({domainId, name, country, components}: ILabDto): ILabDataModel {
    return {domainId, name, country, components};
  }

  dtoToDomain(dto: ILabDto): Lab {
    return Lab.create(dto, new UniqueEntityID(dto.domainId));
  }

}
