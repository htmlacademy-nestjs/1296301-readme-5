import 'multer';
import FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { Body, Req, Controller, Delete, Param, Post, Get, Patch, UploadedFile, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { CreatePostDto, PostQuery, SearchQuery, CreatePhotoPostDto, UpdatePostDto } from '@project/shared/blog/dto';
import { PublicationStatus } from '@project/shared/app/types';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exeption.filter';

import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interseptors/user-id.interceptor';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Req() req: Request, @Body() dto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
    if (file && dto instanceof CreatePhotoPostDto) {
      const formData = new FormData();
      formData.append('file', Buffer.from(file.buffer), file.originalname);

      const { data: photo } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload/photo`, formData, {
        headers: {
          'Content-Type': req.headers['content-type'],
          ...formData.getHeaders(),
        },
      });

      dto.link = photo.path;
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/add`, dto);

    return data;
  }

  @Post('repost/:id')
  public async repost(@Req() req: Request, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${id}`, null, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @Get('posts')
  public async showPublications(@Query() query: PostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, {
      params: query
    });

    return data;
  }

  @Get('search')
  public async searchPublicationsByTitle(@Query() query: SearchQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/search`, {
      params: query
    });

    return data;
  }

  @Get('drafts')
  async showDrafts(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/drafts`,{
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
    return data;
  }

  @Get('post/:id')
  public async showPostById(@Param('id') id: string) {
    const { data: postData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);

    return postData;
  }

  @Patch('post/:id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      },
    });

    return data;
  }

  @Delete('post/:id')
  public async delete(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      },
    });
  }

  @Get('likes/:postId')
  public async getLikes(@Param('postId') postId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Likes}/${postId}`,{
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @Post('likes/:postId')
  public async setLike(@Param('postId') postId: string, @Req() req: Request) {
    const { data: post } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${postId}`);

    if (post.status === PublicationStatus.Published) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Likes}/${postId}`,null,{
        headers: {
          'Authorization': req.headers['authorization'],
        },
      });

      return data;
    }
  }

  @Delete('likes/:postId')
  public async deleteLike(@Param('postId') postId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Likes}/${postId}`,{
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('send-news')
  public async sendNews(@Req() req: Request) {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/news`,{
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });
  }
}
