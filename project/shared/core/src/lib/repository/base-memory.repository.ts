import { randomUUID } from 'node:crypto';
import { CRUDRepository } from '@project/shared/app/types';

export abstract class BaseMemoryRepository<T, I, R> implements CRUDRepository<T, I, R> {
  protected entities: Map<T[I], T> = new Map();

  public async findById(id: T[I]): Promise<R | null> {
    return this.entities.get(id) || null;
  }

  public async save(entity: T): Promise<R> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    this.entities.set(entity.id, entity);

    return entity;
  }

  public async update(id: T[I], entity: T): Promise<R> {
    if (!this.entities.has(id)) {
      throw new Error(`Entity with id ${id} does not exist`);
    }

    this.entities.set(id, { ...entity, id });

    return entity;
  }

  public async delete(id: T[I]): Promise<void> {
    this.entities.delete(id);
  }
}
