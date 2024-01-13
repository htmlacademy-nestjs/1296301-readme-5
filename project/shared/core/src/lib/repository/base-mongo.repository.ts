import { Document, Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

import { Entity, EntityIdType } from '@project/shared/app/types';
import { Repository } from '@project/shared/app/types';

export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  IdType,
  DocumentType extends Document
  > implements Repository<EntityType, IdType> {

  protected constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) {}

  protected createEntityFromDocument(document: DocumentType): EntityType | null {
    if (! document) {
      return null;
    }

    return this.createEntity(document.toObject({ versionKey: false }));
  }

  public async findById(id: IdType): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();
    return this.createEntityFromDocument(document);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    entity.id = newEntity._id.toString();
    return entity;
  }

  public async update(id: IdType, entity: EntityType): Promise<EntityType> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      id,
      entity.toPOJO(),
      { new: true, runValidators: true }
    )
      .exec();

    if (! updatedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  public async delete(id: IdType): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (! deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }
  }
}
