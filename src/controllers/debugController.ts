import {StaticController} from "../core/infra/baseController";
import {Router} from 'express';
import {Container} from "typedi";
import config from "../../config";
import ILdapService from "../services/iServices/iLdapService";

const route = Router();
export default (app: Router) => {
  app.use('/debug', route);
  const ldapService = Container.get(config.deps.services.ldap.name) as ILdapService;

  route.get('', async (req, res, next) => {
    return await StaticController.simpleController(res, next,
      async () => {
        const ret = await ldapService.ping();
        console.log(ret);
        return ret;
      }, StaticController.ok);
  });
}