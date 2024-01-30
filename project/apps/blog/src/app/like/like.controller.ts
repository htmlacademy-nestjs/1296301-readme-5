import { Controller, HttpStatus, Param, Post, Get, Delete, Req, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { RequestWithTokenPayload } from '@project/shared/app/types';

import { LikesInfo } from './constants/like.constants';
import { LikeService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesInfo.Add
  })
  @UseGuards(CheckAuthGuard)
  @Post(':postId')
  public async createLike(@Param('postId') postId: string, @Req() { user }: RequestWithTokenPayload) {
    const newLike = await this.likeService.create(postId, user.sub);

    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: LikesInfo.Delete
  })
  @UseGuards(CheckAuthGuard)
  @Delete(':postId')
  public async destroy(@Param('postId') postId: string, @Req() { user }: RequestWithTokenPayload) {
    await this.likeService.deleteLike(postId, user.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesInfo.Show
  })
  @UseGuards(CheckAuthGuard)
  @Get(':postId')
  public async getLikes(@Param('postId') postId: string) {
    const likes = await this.likeService.findByPostId(postId);

    return fillDto(LikeRdo, likes.map((like) => like.toPOJO()));
  }
}
