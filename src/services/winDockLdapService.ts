import ILdapService from "./iServices/iLdapService";
import child_process from 'child_process';
import config from "../../config";
import {Service} from "typedi";

const Shell = require('node-powershell');

@Service()
export default class WinDockerLdapService implements ILdapService {
  static async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ping(): Promise<string> {
    const command = `docker exec ${config.ldapContainerName} ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin`;
    let ret: { err: boolean, msg: string } | undefined;
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        ret = {err: true, msg: error.message};
      } else if (stderr) {
        console.log(`stderr: ${stderr}`);
        ret = {err: true, msg: stderr};
      } else {
        ret = {err: false, msg: stdout};
      }
    });
    while (!ret) await WinDockerLdapService.sleep(10);
    if (ret.err) throw new Error(ret.msg);
    return ret.msg;
  }

  ldapadd(): void {
  }

  ldapdelete(): void {
  }

  ldapmodify(): void {
  }

}