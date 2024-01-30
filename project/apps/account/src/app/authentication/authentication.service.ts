import * as crypto from 'node:crypto';
import {
  Injectable, Inject, ConflictException,
  UnauthorizedException, NotFoundException,
  BadRequestException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { createJWTPayload } from '@project/shared/helpers';
import { dbConfig, jwtConfig } from '@project/shared/config/account';
import { User } from '@project/shared/app/types';
import { CreateUserDto, LoginUserDto, ChangePasswordUserDto } from '@project/shared/blog/dto';

import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_WRONG, AUTH_USER_NOT_FOUND, AUTH_USER_NOT_CORRECT_PASSWORD } from './authentication.constants';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(dbConfig.KEY)
    private readonly dataBaseConfig: ConfigType<typeof dbConfig>,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
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

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changePassword(dto: ChangePasswordUserDto) {
    const { password, newPassword, userId } = dto;
    const existUser = await this.blogUserRepository.findById(userId);

    if (!await existUser.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_NOT_CORRECT_PASSWORD);
    }

    const userEntity = await existUser.setPassword(newPassword);

    return await this.blogUserRepository.update(userId, userEntity);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      }),
    };
  }
}
