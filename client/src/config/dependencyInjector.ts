import IConfigService from "../service/iServices/iConfigService";
import ConfigService from "../service/configService";

import ILabService from "../service/iServices/iLabService";
import LabService from "../service/labService";

import IUserService from "../service/iServices/iUserService";
import UserService from "../service/userService";

interface Dependencies {
  configService: IConfigService;
  labService: ILabService;
  userService: IUserService;
}

export default {
  configService: new ConfigService(),
  labService: new LabService(),
  userService: new UserService()
} as Dependencies;
