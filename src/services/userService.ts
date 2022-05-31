import {Inject, Service} from "typedi";

import config from "../config";
import IUserRepo from "../db/repos/iRepos/iUserRepo";
import INoIdUserDto from "../dto/iNoIdDto/iNoIdUserDto";
import AuthenticationResult from "../dto/nonEntity/authenticationResult";
import IUserDto from "../dto/iUserDto";
import IUserMapper from "../mappers/iMappers/iUserMapper";
import IUserService from "./iServices/iUserService";
import User from "../domain/user/user";
import UniqueEntityID from "../core/domain/uniqueEntityID";
import {NotFoundError} from "../core/logic/errors";

@Service()
export default class UserService implements IUserService {

  constructor(
    @Inject(config.db.deps.user.name)
    private repo: IUserRepo,
    @Inject(config.deps.mappers.user.name)
    private mapper: IUserMapper
  ) {
  }

  async addUser(userDto: INoIdUserDto): Promise<IUserDto> {
    const user = User.create(userDto);
    return await this.repo.save(this.mapper.domainToDTO(user));
  }

  async updateUserPwd(email: string, newPwd: string): Promise<IUserDto> {
    const existing = await this.repo.getByEmail(email);
    if (existing === null) throw new NotFoundError(`User with e-mail ${email} does not exist.`);

    const newUser = User.create({
      email: existing.email,
      password: newPwd
    }, new UniqueEntityID(existing.domainId));

    return await this.repo.save(this.mapper.domainToDTO(newUser));
  }

  async verifyPassword(email: string, pwd: string): Promise<AuthenticationResult> {
    const user = await this.repo.getByEmail(email);
    return {passwordIsCorrect: user.password === pwd};
  }

}