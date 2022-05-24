import {StaticController} from "../core/infra/baseController";
import {Router} from 'express';
import {Container} from "typedi";
import config from "../../config";
import ILdapService from "../services/iServices/iLdapService";
import {orgUrlInDc} from "../services/utils";

const route = Router();
export default (app: Router) => {
  app.use('/debug', route);
  const ldapService = Container.get(config.deps.services.ldap.name) as ILdapService;

  route.post('/search', async (req, res) => {

    ldapService.search(orgUrlInDc(), {}, searchRes => {
      if (searchRes instanceof Error) {
        StaticController.badRequest(res, searchRes.message);
      } else {
        StaticController.ok(res, searchRes);
      }
    });
  });

  route.post('/add', async (req, resp) => {
    ldapService.add(req.body, (res: any) => StaticController.ok(resp, res));
  });
}