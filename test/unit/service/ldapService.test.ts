import * as assert from "assert";

import ILdapService from "../../../src/services/iServices/iLdapService";
import LdapService from "../../../src/services/ldapService";

async function getLdap(): Promise<ILdapService> {
  const ldapService = new LdapService(false);
  await ldapService.waitUntilReady();
  return ldapService;
}

describe(`Unit: LDAP Service`, async () => {

  describe(`add`, async () => {
    it(`doesn't get us an error`, async (done) => {
      const ldapService = await getLdap();

      ldapService.add({
        cn: 'foo',
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
