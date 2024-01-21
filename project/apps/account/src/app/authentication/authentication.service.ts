import {
  Injectable, Inject, ConflictException,
  UnauthorizedException, NotFoundException, BadRequestException,
  Logger, HttpException, HttpStatus, } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { dbConfig, jwtConfig } from '@project/shared/config/account';
import { Token, TokenPayload, User } from '@project/shared/app/types';

import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_WRONG, AUTH_USER_NOT_FOUND, AUTH_USER_NOT_CORRECT_PASSWORD } from './authentication.constants';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(dbConfig.KEY)
    private readonly dataBaseConfig: ConfigType<typeof dbConfig>,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
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
    const { id, password, newPassword } = dto;
    const existUser = await this.blogUserRepository.findById(id);

    if (!await existUser.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_NOT_CORRECT_PASSWORD);
    }

    const userEntity = await existUser.setPassword(newPassword);

    return await this.blogUserRepository.update(id, userEntity);
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      userName: user.userName,
      avatar: user.avatar,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Error creating token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
