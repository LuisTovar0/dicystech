import DataModel from "../../core/infra/dataModel";

export default interface IProductDataModel extends DataModel {
  name: string;
  quantity: number;
}