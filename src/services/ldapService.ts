import {Service} from "typedi";
import {Client, createClient, SearchOptions} from "ldapjs";

import config from "../../config";
import ILdapService from "./iServices/iLdapService";
import {ResultCallback} from "../dto/iNoIdDto/types";
import {sleep} from "./utils";
import Logger from "../core/loaders/logger";

@Service()
export default class LdapService implements ILdapService {

  private client: Client;
  private log;

  private readonly nextTry = 10000;

  //#region connect and bind to LDAP server
  private tryBind() {
    this.log?.info(`🤞 Attempting to bind to LDAP server`);
    let bindDN = 'cn=admin,dc=' + config.ldap.orgDomain.split('.').reduce((prev, curr) => `${prev},dc=${curr}`);
    this.client.bind(bindDN, config.ldap.adminPwd, async e => {
      if (e as Error) {
        this.log?.error(`Coultn't bind! ${e}`);
        await sleep(this.nextTry);
        this.tryBind();
      } else {
        this.log?.info('🌀 Binded to LDAP!');
      }
    });
  }

  private tryConnect() {
    const url: string[] = [];
    config.ldap.urls.forEach(host => url.push(`ldap://${host}`));
    this.client = createClient({url});

    this.client.on('connectRefused', async err => {
      this.log?.error(`🔥 LDAP client connectError ${err.message}`);
      await sleep(this.nextTry);
      this.tryConnect();
    });

    this.client.on('connect', () => {
      this.log?.info('🤟 LDAP client connected');
      this.tryBind();
    });
  }

  //#endregion

  constructor(log: boolean) {
    if (log === undefined || log) this.log = Logger;
    const url: string[] = [];
    config.ldap.urls.forEach(h => url.push(`ldap://${h}`));
    this.client = createClient({url});

    this.tryConnect();
  }

  private middleware(): void {
    if (!this.isReady())
      throw `The back-end hasn't connected to the LDAP server yet.`;
  }

  isReady() {
    return this.client.connected;
  }

  async waitUntilReady(): Promise<void> {
    while (!this.isReady()) await sleep(10);
  }

  add(entry: any, cb?: ResultCallback) {
    this.middleware();
    this.client.add('cn=foo, o=ISEP', entry, err => {
      if (cb) err ?
        cb(err) :
        cb('Added entry at LDAP');
    });
  }

  delete() {
    this.middleware();
  }

  modify() {
    this.middleware();
  }

  search(base: string, options: SearchOptions, callback: ResultCallback) {
    this.middleware();
    this.client.search(base, options, (err, res) => {
      if (err) {
        callback(err);
        return;
      }

      res.on('searchRequest', searchRequest => console.log('searchRequest: ', searchRequest.messageID));
      res.on('searchEntry', entry => callback(entry.object));
      res.on('searchReference', referral => console.log('referral: ' + referral.uris.join()));
      res.on('error', err => callback(err));
      res.on('end', result => console.log('status: ' + result?.status));
    });
  }

}