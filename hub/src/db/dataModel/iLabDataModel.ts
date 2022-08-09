import DataModel from "../../core/infra/dataModel";

export default interface ILabDataModel extends DataModel {
  name: string;
  country: string;
  components: string[];
}