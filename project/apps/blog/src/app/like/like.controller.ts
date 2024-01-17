import { Controller, HttpStatus, Param, Post, Get, Delete } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { LikesMessage } from './constants/like.constants';
import { LikeService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessage.Add
  })
  @Post(':postId')
  public async createLike(@Param('postId') postId: string ) {
    const newLike = await this.likeService.create(postId, 'userId');

    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: LikesMessage.Delete
  })
  @Delete(':postId')
  public async destroy(@Param('postId') postId: string ) {
    await this.likeService.deleteLike(postId, 'userId');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LikesMessage.Show
  })
  @Get(':postId')
  public async getLikes(@Param('postId') postId: string) {
    const likes = await this.likeService.findByPostId(postId);

    return fillDto(LikeRdo, likes.map((like) => like.toPOJO()));
  }
}
