import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationPath, API_TAG_NAME, PublicationMessages, PublicationError } from './publication.constant';
import { adaptRdoPost } from '../post/utils/adapt-rdo-post.util';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAG_NAME)
@Controller(PublicationPath.Main)
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: PublicationMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PublicationError.EmptyList
  })
  @Get()
  public async show() {
    const posts = await this.publicationService.getPosts();

    return posts.map((post) => adaptRdoPost(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PublicationMessages.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PublicationError.PostNotFound
  })
  @Get(PublicationPath.Id)
  public async showById(@Param('id') id: string) {
    const publication = await this.publicationService.findByPostId(id);

    return adaptRdoPost(publication);
  }
}
