import * as assert from "assert";

import ILdapService from "../../../src/services/iServices/iLdapService";
import LdapService from "../../../src/services/ldapService";

describe(`Unit: LDAP Service`, async () => {

  describe(`add`, async () => {
    it(`doesn't return an error`, async (done) => {
      const ldapService = await LdapService.get() as ILdapService;

      ldapService.add({
        cn: 'froo',
        sn: 'bar',
        email: 'foo@bar.com',
        objectclass: 'fooPerson'
      }, (res: any) => {
        assert.ifError(res);
        done();
      });
    });
  });

});
