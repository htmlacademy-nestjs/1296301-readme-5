import { Entity, EntityIdType, DefaultPojoType } from './entity.interface';

export interface Repository<EntityType extends Entity<EntityIdType, PojoType>, IDType, PojoType = DefaultPojoType> {
  findById(id: IDType): Promise<PojoType | null>;
  save(entity: EntityType): Promise<PojoType>;
  update(id: IDType, entity: EntityType): Promise<PojoType>;
  delete(id: IDType): Promise<void>;
}
