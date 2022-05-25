import logger from "../core/loaders/logger";
import config from "../config";

export const sleep = (ms: number, log?: boolean) => new Promise(resolve => {
  log ??= false;
  if (log) logger.info(`Waiting ${~~ms / 1000}s`);
  setTimeout(resolve, ms);
});

export function orgUrlInDc() {
  return 'dc=' + config.ldap.orgDomain.split('.').reduce((prev, curr) => `${prev},dc=${curr}`);
}