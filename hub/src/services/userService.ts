import {Inject, Service} from "typedi";
import jwt from 'jsonwebtoken';

import config from "../config";
import IUserRepo from "../db/repos/iRepos/iUserRepo";
import INoIdUserDto from "../dto/iNoIdDto/iNoIdUserDto";
import AuthenticationResult from "../dto/nonEntity/authenticationResult";
import IUserMapper from "../mappers/iMappers/iUserMapper";
import IUserService from "./iServices/iUserService";
import User from "../domain/user/user";
import UniqueEntityID from "../core/domain/uniqueEntityID";
import {NotFoundError} from "../core/logic/errors";
import IUserHiddenPassword from "../dto/iUserHiddenPwd";

@Service()
export default class UserService implements IUserService {

  constructor(
    @Inject(config.db.deps.user.name)
    private repo: IUserRepo,
    @Inject(config.deps.mappers.user.name)
    private mapper: IUserMapper
  ) {
  }

  async getUser(searchEmail: string): Promise<IUserHiddenPassword> {
    const {domainId, email} = await this.repo.getByEmail(searchEmail);
    return {domainId, email};
  }

  async addUser(userDto: INoIdUserDto): Promise<IUserHiddenPassword> {
    const user = User.create(userDto);
    const persistedDto = await this.repo.save(this.mapper.domainToDTO(user));
    return this.mapper.dtoToHiddenPwdDto(persistedDto);
  }

  async updateUserPwd(email: string, newPwd: string): Promise<IUserHiddenPassword> {
    const existing = await this.repo.getByEmail(email);
    if (existing === null) throw new NotFoundError(`User with e-mail ${email} does not exist.`);

    const newUser = User.create({
      email: existing.email,
      password: newPwd
    }, new UniqueEntityID(existing.domainId));

    const persistedDto = await this.repo.save(this.mapper.domainToDTO(newUser));
    return this.mapper.dtoToHiddenPwdDto(persistedDto);
  }

  async verifyPassword(email: string, pwd: string): Promise<AuthenticationResult> {
    const user = await this.repo.getByEmail(email);
    return {
      passwordIsCorrect: user.password.trim() === pwd.trim(),
      jwtToken: jwt.sign(user.domainId, config.api.jwt.accessSecret)
    };
  }



}