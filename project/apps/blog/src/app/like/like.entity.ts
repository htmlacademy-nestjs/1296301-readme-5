import { Entity, Like } from "@project/shared/app/types";

export class LikeEntity implements Like, Entity<string, Like> {
  public id?: string;
  public postId: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  public toPOJO() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public populate(data: Like) {
    this.id = data.id ?? undefined;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }


  static fromObject(data: Like): LikeEntity {
    return new LikeEntity()
      .populate(data);
  }
}
