import config from "../../config";
import {Service} from "typedi";
import logger from "../core/loaders/logger";
import {createClient} from "ldapjs";
import {Observable} from "rxjs";

@Service()
export default class LdapService {

  constructor() {
    const url = [];
    config.ldap.urls.forEach(u => url.push(`ldap://${u}`));
    this.client = createClient({url, log: logger});

    ['error', 'connectError', 'connectTimeout', 'connectRefuse'].forEach(str => {
      this.client.on(str, err => {
        logger.error(`🔥 LDAP client: ${str}`);
        throw err;
      });
    });

    this.client.on('connect', () => {
      logger.info('🤟 LDAP client connected');
      this.client.bind('cn=root', config.ldap.adminPwd, () => {
        logger.info('Whassuuup');
      });
      const entry = {
        cn: 'foo',
        sn: 'bar',
        email: ['foo@bar.com', 'foo1@bar.com'],
        objectclass: 'fooPerson'
      };
      this.add(entry);
    });
  }

  add(entry) {
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

  search(base, options) {
    return new Observable < Object > (o => {
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