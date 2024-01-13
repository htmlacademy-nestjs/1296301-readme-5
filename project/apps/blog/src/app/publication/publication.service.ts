import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationError } from './publication.constant';
import { PostRepository } from '../post/post.repository';


@Injectable()
export class PublicationService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  public async findByPostId(id: string) {
    const post  = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(PublicationError.PostNotFound);
    }

    return post;
  }
}
