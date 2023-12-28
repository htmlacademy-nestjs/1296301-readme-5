import { Injectable, Inject, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { dbConfig } from '@project/shared/config/account';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_WRONG, AUTH_USER_NOT_FOUND, AUTH_USER_NOT_CORRECT_PASSWORD } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(dbConfig.KEY)
    private readonly dataBaseConfig: ConfigType<typeof dbConfig>,
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, userName, password, avatar } = dto;
    const blogUser = { email, userName, avatar, passwordHash: '' };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository
      .save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_WRONG);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }

  public async changePassword(dto: ChangePasswordUserDto) {
    const { id, password, newPassword } = dto;
    const existUser = await this.blogUserRepository.findById(id);

    if (!await existUser.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_NOT_CORRECT_PASSWORD);
    }

    const userEntity = await existUser.setPassword(newPassword);

    return await this.blogUserRepository.update(id, userEntity);
  }
}
