import { compare, genSalt, hash } from 'bcrypt';
import { AuthUser } from '@project/shared/app/types';
import { getDate } from '@project/shared/helpers';
import { SALT_ROUNDS } from './blog-user.constant';
import { Entity } from '@project/shared/app/types';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public userName: string;
  public registrationDate: string;
  public avatar?: string;
  public publicationsCount: number;
  public subscribersCount: number;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      avatar: this.avatar,
      userName: this.userName,
      registrationDate: this.registrationDate,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.userName = data.userName;
    this.avatar = data.avatar || '';
    this.publicationsCount = 0;
    this.subscribersCount = 0;
    this.registrationDate = getDate();
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): BlogUserEntity {
    return new BlogUserEntity(data);
  }
}
