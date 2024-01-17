import { Injectable } from '@nestjs/common';
import { PostContentType } from '@project/shared/app/types';
import { BlogUserRepository } from '../../../../account/src/app/blog-user/blog-user.repository';
import { PostRepository } from '../../../../blog/src/app/post/post.repository';

@Injectable()
export class FeedService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: BlogUserRepository
  ) {}

  public async findFeed(id: string): Promise<PostContentType[]> {}
}
