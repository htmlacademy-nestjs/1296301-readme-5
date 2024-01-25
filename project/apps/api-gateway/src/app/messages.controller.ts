import { HttpService } from '@nestjs/axios';
import { Body, Req, Get, Param, Controller, Post, Patch, Query, UseFilters, Delete } from '@nestjs/common';

import { CreateMessageDto, UpdateMessageDto, MessageQuery } from '@project/shared/blog/dto';

import { AxiosExceptionFilter } from './filters/axios-exeption.filter';
import { ApplicationServiceURL } from './app.config';

@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('add')
  public async createComment(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/`, dto,{
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @Get('/')
  public async showComments(@Query() query: MessageQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/`, {
      params: query,
    });

    return data
  }

  @Get(':id')
  public async showComment(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`);

    return data
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Req() req: Request, @Body() dto: UpdateMessageDto) {
    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Comments}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }

  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }
}
