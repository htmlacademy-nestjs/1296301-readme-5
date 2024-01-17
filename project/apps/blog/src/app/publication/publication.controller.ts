import { Controller } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationPath, API_TAG_NAME } from './publication.constant';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAG_NAME)
@Controller(PublicationPath.Main)
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
  ) {}
}
