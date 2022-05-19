import {Service} from "typedi";
import {Client, createClient, SearchOptions} from "ldapjs";
import {Observable} from "rxjs";

import config from "../../config";
import logger from "../core/loaders/logger";
import ILdapService from "./iServices/iLdapService";

@Service()
export default class LdapService implements ILdapService {

  private client: Client;

  private readonly sleep = (ms: number) => new Promise(resolve => {
    logger.info(`Waiting ${~~ms / 1000}s\n`);
    // let loading = (function() {
    //   let P = ["\\", "|", "/", "-"];
    //   let x = 0;
    //   return setInterval(function() {
    //     console.log("\r" + P[x++]);
    //     x &= 3;
    //   }, 250);
    // })();
    setTimeout(resolve, ms);
    // clearInterval(loading);
  });
  private readonly nextTry = 10000;

  tryBind() {
    logger.info(`Attempting to bind to LDAP server (password ${config.ldap.adminPwd})`);
    this.client.bind(`cn=admin,dc=example,dc=org`, config.ldap.adminPwd, async e => {
      if (e as Error) {
        logger.error(`Coultn't bind! ${e}`);
        await this.sleep(this.nextTry);
        this.tryBind();
      } else {
        logger.info('Binded to LDAP!');
        this.search('dc=example,dc=org', {}).subscribe({
          next: (r) => {
            console.log(r);
          }
        });
      }
    });
  }

  tryConnect() {
    const url: string[] = [];
    config.ldap.urls.forEach(host => url.push(`ldap://${host}`));
    this.client = createClient({url});

    ['error', 'connectError', 'connectTimeout', 'connectRefused'].forEach(errEvent => {
      this.client.on(errEvent, async err => {
        logger.error(`🔥 LDAP client ${errEvent} ${err.message}`);
        await this.sleep(this.nextTry);
        this.tryBind();

        // const entry = {
        //   cn: 'foo',
        //   sn: 'bar',
        //   email: ['foo@bar.com', 'foo1@bar.com'],
        //   objectclass: 'fooPerson'
        // };
        // this.add(entry);

      });
    });

    this.client.on('connect', () => {
      logger.info('🤟 LDAP client connected');
      this.tryBind();
    });
  }

  constructor() {
    const url: string[] = [];
    config.ldap.urls.forEach(u => url.push(`ldap://${u}`));
    this.client = createClient({url, log: logger});

    this.tryConnect();
  }

  add(entry: any) {
    this.client.add('cn=foo, o=example', entry, err => {
      if (err) {
        logger.error('Error adding entry to LDAP server.\n');
        throw err;
      }
      logger.info('Added entry at LDAP');
    });
  }

  delete() {
  }

  modify() {
  }

  search(base: string, options: SearchOptions) {
    return new Observable<Object>(o => {
      this.client.search(base, options, (err, res) => {
        if (err) {
          o.next(err);
          return;
        }

        res.on('searchRequest', (searchRequest) => {
          console.log('searchRequest: ', searchRequest.messageID);
        });
        res.on('searchEntry', (entry) => {
          console.log('entry: ' + JSON.stringify(entry.object));
        });
        res.on('searchReference', (referral) => {
          console.log('referral: ' + referral.uris.join());
        });
        res.on('error', (err) => {
          console.error('error: ' + err.message);
        });
        res.on('end', (result) => {
          console.log('status: ' + result?.status);
        });
        o.next({hello: 'world'});
      });
    });
  }

}