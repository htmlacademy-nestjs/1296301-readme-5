import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
