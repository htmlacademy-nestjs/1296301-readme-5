import { Controller, Post, Get, Body, Req, Param, UseGuards, HttpStatus, HttpCode, } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { RequestWithTokenPayload } from '@project/shared/app/types';
import { ChangePasswordUserDto, CreateUserDto } from '@project/shared/blog/dto';

import { UserInfo } from './authentication.constants';
import { AuthenticationService } from './authentication.service';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { NotificationsService } from '../notifications/notifications.service';

interface RequestWithUser {
  user?: BlogUserEntity;
}

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: UserInfo.Register,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, userName } = newUser;
    await this.notificationsService.registerSubscriber({ email, userName });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: UserInfo.Login,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserInfo.WrongPassword,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: UserInfo.UpdatePassword,
  })
  @Post('update-password')
  public async updatePassword(@Body() dto: ChangePasswordUserDto) {
    const updatedUser = await this.authService.changePassword(dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: UserInfo.FoundUser,
  })
  @Get(':id')
  public async show(@Param('id') id: string ) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.RefreshToken,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
