import {Service} from "typedi";
import {Client, createClient, SearchOptions} from "ldapjs";

import config, {LdapConfig} from "../config";
import {ResultCallback} from "../../dto/jsonDto/types";
import {orgUrlInDc, sleep} from "../../services/utils";
import Logger from "../../core/loaders/logger";

@Service()
export default class Ldap {

  // @ts-ignore this attribute is not defined in the constructor, but always in a method called by it
  private client: Client;
  private readonly log;
  private readonly dbConfig = config.db as LdapConfig;

  private readonly nextTry = 10000;

  //#region connect and bind to LDAP server
  private tryBind() {
    this.log?.info(`🤞 Attempting to bind to LDAP server`);
    let bindDN = 'cn=admin,' + orgUrlInDc();
    this.client.bind(bindDN, this.dbConfig.adminPwd, async e => {
      if (e as Error) {
        this.log?.error(`Coultn't bind! ${e}`);
        await sleep(this.nextTry, !!this.log);
        this.tryConnect();
      } else {
        this.log?.info('🌀 Binded to LDAP!');
      }
    });
  }

  private tryConnect() {
    const url: string[] = [];
    this.dbConfig.urls.forEach(host => url.push(`ldap://${host}`));
    this.client = createClient({url});

    this.client.on('connectRefused', async err => {
      this.log?.error(`🔥 LDAP client connectError ${err.message}`);
      await sleep(this.nextTry, !!this.log);
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
    this.tryConnect();
  }

  static async get(): Promise<Ldap> {
    const ldapService = new Ldap(false);
    await ldapService.waitUntilReady();
    return ldapService;
  }

  private middleware(callback?: ResultCallback): void {
    if (!this.isReady() && callback)
      callback(new Error(`The back-end hasn't connected to the LDAP server yet.`));
  }

  isReady() {
    return this.client.connected;
  }

  async waitUntilReady(): Promise<void> {
    while (!this.isReady()) await sleep(10, !!this.log);
  }

  add(entry: any, cb?: ResultCallback) {
    this.middleware();
    this.client.add('cn=foo,ou=users,' + orgUrlInDc(), entry, err => {
      if (cb) cb(err ? err :
        'Added entry at LDAP');
    });
  }

  delete() {
    this.middleware();
  }

  modify() {
    this.middleware();
  }

  search(base: string, options: SearchOptions, callback: ResultCallback) {
    this.middleware(callback);
    this.client.search(base, options, (err, res) => {
      if (err) {
        callback(err);
        return;
      }

      res.on('searchRequest', searchRequest => this.log?.info(`searchRequest: ${searchRequest.messageID}`));
      res.on('searchEntry', entry => callback(entry.object));
      res.on('searchReference', referral => this.log?.info(`referral: ${referral.uris.join()}`));
      res.on('error', err => callback(err));
      res.on('end', result => this.log?.info(`status: ${result?.status}`));
    });
  }

}