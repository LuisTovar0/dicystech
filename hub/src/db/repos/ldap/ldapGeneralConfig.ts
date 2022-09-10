import {Service} from "typedi";

import IDbGeneralConfig from "../../../services/iRepos/IDbGeneralConfig";

@Service()
export default class LdapGeneralConfig implements IDbGeneralConfig {

  connect(): void {
    throw new Error(`LDAP DB is not implemented.`);
  }

}