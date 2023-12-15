import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose({ name: 'id' })
  public id: string;

  @Expose({ name: 'originalId' })
  public originalId: string;

  @Expose()
  public type: string;

  @Expose({ name: 'authorId' })
  public authorId: string;

  @Expose({ name: 'originalUserId' })
  public originalUserId: string;

  @Expose()
  public creationDate: string;

  @Expose()
  public publicationDate: string;

  @Expose()
  public status: string;

  @Expose()
  public isRepost: boolean;

  @Expose()
  public likesCount: number;

  @Expose()
  public messagesCount: number;

  @Expose()
  public tags: string[];
}
