import * as assert from "assert";

import LdapService from "../../../src/services/ldapService";

describe(`Unit: LDAP Service`, async () => {

  const ldap = new LdapService();
  await ldap.waitUntilReady();

  describe(`add`, () => {
    it(`idk`, () => {
      ldap.add({
        cn: 'foo',
        sn: 'bar',
        email: 'foo@bar.com',
        objectclass: 'fooPerson'
      }, res => {
        assert.ifError(res);
      });
    });
  });

});
