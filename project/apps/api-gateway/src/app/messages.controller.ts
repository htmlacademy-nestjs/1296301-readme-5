import { HttpService } from '@nestjs/axios';
import { Body, Req, Get, Param, Controller, Post, Patch, Query, UseFilters, Delete, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMessageDto, UpdateMessageDto, MessageQuery } from '@project/shared/blog/dto';

import { MessagesInfo } from './app.constants';
import { AxiosExceptionFilter } from './filters/axios-exeption.filter';
import { ApplicationServiceURL } from './app.config';

@ApiTags('messages')
@Controller('messages')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MessagesInfo.Add,
  })
  @Post('add')
  public async createMessage(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Messages}/`, dto,{
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: MessagesInfo.Show,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MessagesInfo.InvalidPost,
  })
  @Get('/')
  public async showMessages(@Query() query: MessageQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Messages}/`, {
      params: query,
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: MessagesInfo.Show,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MessagesInfo.InvalidMessage,
  })
  @Get(':id')
  public async showMessage(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Messages}/${id}`);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MessagesInfo.Update,
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Req() req: Request, @Body() dto: UpdateMessageDto) {
    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Messages}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: MessagesInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MessagesInfo.InvalidMessage,
  })
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Messages}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }
}
