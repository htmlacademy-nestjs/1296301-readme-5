import { Entity } from "@project/shared/app/types";
import { File } from "@project/shared/app/types";

export class FileEntity implements Entity<FileEntity>, File {
  public id: string;
  public name: string;
  public path: string;
  public size: number;

  constructor(file: File) {
    this.fillEntity(file);
  }

  public fillEntity(entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.path = entity.path;
    this.size = entity.size;
  }

  public toPOJO(): FileEntity {
    return {
      ...this,
    }
  }
}
