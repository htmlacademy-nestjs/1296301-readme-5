import { PrismaClientService } from "@project/shared/blog/models";

import { DefaultPojoType, Entity, EntityIdType } from "@project/shared/app/types";
import { Repository } from "@project/shared/app/types";

export abstract class BasePostgresRepository<
  EntityType,
  IDType,
  DocumentType = DefaultPojoType,
  > implements Repository<EntityType, IDType, DocumentType> {

  protected constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async findById(id: IDType): Promise<DocumentType | null> {
    throw new Error('Not implemented');
  }

  public async save(entity: EntityType): Promise<DocumentType> {
    throw new Error('Not implemented');
  }

  public async update(id: IDType, entity: EntityType): Promise<DocumentType> {
    throw new Error('Not implemented');
  }

  public async delete(id: IDType): Promise<void> {
    throw new Error('Not implemented');
  }

}
