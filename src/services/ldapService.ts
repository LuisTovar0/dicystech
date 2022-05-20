import {Service} from "typedi";
import {Client, createClient, SearchOptions} from "ldapjs";

import config from "../../config";
import logger from "../core/loaders/logger";
import ILdapService from "./iServices/iLdapService";
import ResultCallback from "../dto/iNoIdDto/ResultCallback";
import {sleep} from "./utils";

@Service()
export default class LdapService implements ILdapService {

  private client: Client;
  private ready = false;

  private readonly nextTry = 10000;

  //#region connect and bind to LDAP server
  private tryBind() {
    logger.info(`🤞 Attempting to bind to LDAP server`);
    let bindDN = 'cn=admin,dc=' + config.ldap.orgDomain.split('.').reduce((prev, curr) => `${prev},dc=${curr}`);
    this.client.bind(bindDN, config.ldap.adminPwd, async e => {
      if (e as Error) {
        logger.error(`Coultn't bind! ${e}`);
        await sleep(this.nextTry);
        this.tryBind();
      } else {
        logger.info('🌀 Binded to LDAP!');

        this.ready = true;
      }
    });
  }

  private tryConnect() {
    const url: string[] = [];
    config.ldap.urls.forEach(host => url.push(`ldap://${host}`));
    this.client = createClient({url});

    ['error', 'connectError', 'connectTimeout', 'connectRefused'].forEach(errEvent => {
      this.client.on(errEvent, async err => {
        logger.error(`🔥 LDAP client ${errEvent} ${err.message}`);
        await sleep(this.nextTry);
        this.tryBind();
      });
    });

    this.client.on('connect', () => {
      logger.info('🤟 LDAP client connected');
      this.tryBind();
    });
  }

  //#endregion

  constructor() {
    const url: string[] = [];
    config.ldap.urls.forEach(u => url.push(`ldap://${u}`));
    this.client = createClient({url, log: logger});

    this.tryConnect();
  }

  private middleware(): void {
    if (!this.isReady())
      throw new Error(`The back-end hasn't connected to the LDAP server yet.`);
  }

  isReady() {
    return this.ready;
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