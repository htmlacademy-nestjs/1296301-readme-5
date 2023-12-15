import { Controller, Get, Param } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationPath } from './publication.constant';
import { adaptRdoPost } from '../post/utils/adapt-rdo-post.util';

@Controller(PublicationPath.Main)
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
  ) {}

  @Get()
  public async show() {
    const posts = await this.publicationService.getPosts();

    return posts.map((post) => adaptRdoPost(post) );
  }

  @Get(PublicationPath.Id)
  public async showById(@Param('id') id: string) {
    const publication = await this.publicationService.findByPostId(id);

    return adaptRdoPost(publication);
  }
}
