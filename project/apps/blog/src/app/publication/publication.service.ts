import { Injectable, NotFoundException } from '@nestjs/common';
import { PostContentType } from '@project/shared/app/types';
import { PublicationError } from './publication.constant';
import { PostRepository } from '../post-repository/post-repository';


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

  public async getPosts(): Promise<PostContentType[]> {
    return this.postRepository.getFullList();
  }
}
