import 'multer';
import FormData from 'form-data';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Param,
  UseFilters,
  UseGuards,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { CreateUserDto, LoginUserDto, ChangePasswordUserDto } from '@project/shared/blog/dto';
import { MongoIdValidationPipe } from '@project/shared/core';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exeption.filter';
import { UseridInterceptor } from './interseptors/user-id.interceptor';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @UseInterceptors(FileInterceptor('file') as any)
  @Post('registration')
  public async register(@Req() req: Request, @Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    let path;

    if (file) {
      const formData = new FormData();
      formData.append('file', Buffer.from(file.buffer), file.originalname);
      const { data: avatar } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload/avatar`, formData, {
        headers: {
          'Content-Type': req.headers['content-type'],
          ...formData.getHeaders()
        }
      });

      path = avatar.path;
    }

    const { data: user } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, { ...createUserDto, avatar: path });

    return user;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);

    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('change-password')
  public async changePassword(@Body() dto: ChangePasswordUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/update-password`, dto);

    return data;
  }

  @Get('/:id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const { data: userData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    const { data: postsCount } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user-posts-count/${id}`);
    let avatar = null;

    if (userData.avatar) {
      avatar = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/upload/${userData.avatar}`);
    }

    return { ...userData, postsCount, avatar };
  }
}
