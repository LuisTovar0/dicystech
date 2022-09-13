import WithRequester from "../../core/infra/withRequester";

export default interface IJsonLabDto extends WithRequester {
  name: string;
  country: string;
  components: string[];
}