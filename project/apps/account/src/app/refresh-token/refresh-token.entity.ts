import { Entity, Token } from '@project/shared/app/types';

export class RefreshTokenEntity implements Entity<string>, Token {
  public createdAt: Date;
  public expiresIn: Date;
  public id?: string;
  public tokenId: string;
  public userId: string;
  [key: string]: unknown;

  constructor(refreshToken: Token) {
    this.createdAt = new Date;
    this.populate(refreshToken);
  }

  public populate(entity: Token): RefreshTokenEntity {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;

    return this;
  }

  public toPOJO(): RefreshTokenEntity {
    return { ...this };
  }
}
