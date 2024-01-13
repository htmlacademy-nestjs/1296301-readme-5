import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/shared/core';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserModel } from './blog-user.model';
import { EntityIdType } from '@project/shared/app/types';

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, EntityIdType, BlogUserModel> {
  constructor(
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(blogUserModel, BlogUserEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }
}

