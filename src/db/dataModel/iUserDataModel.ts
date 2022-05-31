import DataModel from "../../core/infra/dataModel";

export default interface IUserDataModel extends DataModel {
  email: string,
  password: string,
}