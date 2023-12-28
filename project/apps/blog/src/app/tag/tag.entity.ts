import { Tag } from '@project/shared/app/types';
import { Entity } from '@project/shared/app/types';

export class TagEntity implements Tag, Entity<string> {
  public id?: string;
  public tag: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Tag) {
    if (!data.tag) {
      throw new Error('Text tag is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id ?? '';
    this.tag = data.tag;
    this.updatedAt = data.updatedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.tag,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
