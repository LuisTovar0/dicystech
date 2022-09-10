import {Service} from "typedi";

import IDb from "../../../services/iRepos/iDb";

@Service()
export default class LdapGeneralConfig implements IDb {

  connect(): void {
    throw new Error(`LDAP DB is not implemented.`);
  }

}