export interface CRUDRepository<Entity, Identification, Result> {
  findById(id: Identification): Promise<Result | null>;
  save(item: Entity): Promise<Result>;
  update(id: Identification, item: Entity): Promise<Result>;
  delete(id: Identification): Promise<void>;
}
