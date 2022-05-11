import ILdapService from "./iServices/iLdapService";
import child_process from 'child_process';
import config from "../../config";
import {Service} from "typedi";
import ValidationError from "../core/logic/validationError";
import log from "../core/loaders/logger";
import ldap, {Client} from "ldapjs";

@Service()
export default class LdapService implements ILdapService {

  public client: Client;

  constructor() {
    const url: string[] = [];
    config.ldapUrls.forEach(u => url.push(`ldap://${u}`));
    this.client = ldap.createClient({url, log});

    ['error', 'connectError', 'connectTimeout', 'connectRefuse'].forEach((str) => {
      this.client.on(str, (err: any) => {
        log.error(`🔥 LDAP client: ${str}`);
        throw err;
      });
    });

    this.client.on('connect', () => {
      log.info('🤟 LDAP client connected');
    });
  }

  static async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ping(): Promise<string> {
    const command = `docker exec ${config.ldapContainerName} ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=HiHello,dc=example,dc=org" -w HiHello`;
    let ret: { err: boolean, msg: string } | undefined;
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        // console.log(`error: ${error.message}`);
        ret = {err: true, msg: error.message};
      } else if (stderr) {
        console.log(`stderr: ${stderr}`);
        ret = {err: true, msg: stderr};
      } else {
        ret = {err: false, msg: stdout};
      }
    });
    while (!ret) await LdapService.sleep(10);
    if (ret.err) throw new ValidationError(ret.msg);
    return ret.msg;
  }

  ldapadd(): void {
  }

  ldapdelete(): void {
  }

  ldapmodify(): void {
  }

}