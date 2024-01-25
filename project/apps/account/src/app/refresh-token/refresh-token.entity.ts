import { Entity, Token } from '@project/shared/app/types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, Token {
  public createdAt: Date;
  public expiresIn: Date;
  public id?: string;
  public tokenId: string;
  public userId: string;
  [key: string]: unknown;

  constructor(refreshToken: Token) {
    this.populate(refreshToken);
  }

  public populate(entity: Token): RefreshTokenEntity {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt ?? new Date();
    this.expiresIn = entity.expiresIn;

    return this;
  }

  public toPOJO(): Token {
    return {
      id: this.id,
      userId: this.userId,
      tokenId: this.tokenId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
    };
  }
}
