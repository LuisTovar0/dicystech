import {Application} from "express";
import {Container} from "typedi";
import config from "../../../config";
import ILdapService from "../../services/iServices/iLdapService";
import logger from "./logger";

export default async (app: Application) => {
  const service = Container.get(config.services.ldap.name) as ILdapService;
  try {
    const ping = await service.ping();
    if (ping.split(`\n`)[0] !== `# extended LDIF`) throw new Error(`Ping result: ${ping}`);
  } catch (e) {
    logger.error(`🔥 Could not ping LDAP server`);
    throw e;
  }
}