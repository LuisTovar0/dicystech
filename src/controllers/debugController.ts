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

    ldapService.search('dc=isep,dc=ipp,dc=pt', {}, searchRes => {
      if (searchRes instanceof Error) {
        StaticController.badRequest(res, searchRes.message);
      } else {
        StaticController.ok(res, searchRes);
      }
    });
  });
}