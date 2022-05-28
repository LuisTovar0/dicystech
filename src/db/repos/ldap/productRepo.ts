import IProductRepo from "../iRepos/iProductRepo";
import IProductDto from "../../../dto/iProductDto";
import {Service} from "typedi";

@Service()
export default class LdapProductRepo implements IProductRepo {
  getById(id: string): Promise<IProductDto> {
    throw `Not yet implemented.`;
  }

  getByName(productName: string): Promise<IProductDto> {
    throw `Not yet implemented.`;
  }

  save(product: IProductDto): Promise<IProductDto> {
    throw `Not yet implemented.`;
  }

}