import { Controller, Post, Get, Body, Param, Headers } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @Post('update-password')
  public async updatePassword(@Body() dto: ChangePasswordUserDto) {
    const updatedUser = await this.authService.changePassword(dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }
}
