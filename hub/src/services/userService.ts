import {Inject, Service} from "typedi";

import config from "../config";
import IUserRepo from "./iRepos/iUserRepo";
import INoIdUserDto from "../dto/iNoIdDto/iNoIdUserDto";
import AuthenticationResult from "../dto/nonEntity/authenticationResult";
import IUserMapper from "../mappers/iMappers/iUserMapper";
import IUserService from "../controllers/iServices/iUserService";
import User from "../domain/user/user";
import UniqueEntityID from "../core/domain/uniqueEntityID";
import {NotFoundError} from "../core/logic/errors";
import IUserHiddenPassword from "../dto/iUserHiddenPwd";
import IUserDto from "../dto/iUserDto";

@Service()
export default class UserService implements IUserService {

  constructor(
    @Inject(config.db.deps.user.name)
    private repo: IUserRepo,
    @Inject(config.deps.mappers.user.name)
    private mapper: IUserMapper
  ) {
  }

  async getUserHidePwd(email: string): Promise<IUserHiddenPassword> {
    const user = await this.getUser(email);
    return user as IUserHiddenPassword;
  }

  async getUser(email: string): Promise<IUserDto> {
    const user = await this.repo.getByEmail(email);
    if (user === null) throw new NotFoundError(`User with e-mail ${email} does not exist.`);
    return user;
  }

  async addUser(userDto: INoIdUserDto): Promise<IUserHiddenPassword> {
    const user = User.create(userDto);
    const persistedDto = await this.repo.save(this.mapper.domainToDTO(user));
    return this.mapper.dtoToHiddenPwdDto(persistedDto);
  }

  async updateUserPwd(email: string, newPwd: string): Promise<IUserHiddenPassword> {
    const existing = await this.getUser(email);

    const newUser = User.create({
      email: existing.email,
      password: newPwd
    }, new UniqueEntityID(existing.domainId));

    const persistedDto = await this.repo.save(this.mapper.domainToDTO(newUser));
    return this.mapper.dtoToHiddenPwdDto(persistedDto);
  }

  async verifyPassword(email: string, pwd: string): Promise<AuthenticationResult> {
    const {password, domainId} = await this.getUser(email);
    return {passwordIsCorrect: password.trim() === pwd.trim(), domainId};
  }

}
