export default interface BaseMapper<Domain, DTO, DataModel> {

  dtoToDomain(dto: DTO): Domain;

  domainToDTO(model: Domain): DTO;

  dataModelToDTO(dataModel: DataModel): DTO;

  dtoToDataModel(dto: DTO): DataModel;

}