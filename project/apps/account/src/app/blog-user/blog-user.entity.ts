import dayjs from 'dayjs';
import { compare, genSalt, hash } from 'bcrypt';
import { ExternalUser, InternalUser } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements InternalUser, Entity<string> {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public registrationDate: string;
  public avatar?: string;
  public publicationsCount: number;
  public subscribersCount: number;
  public passwordHash: string;

  constructor(user: ExternalUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      avatar: this.avatar,
      firstname: this.firstname,
      lastname: this.lastname,
      registrationDate: this.registrationDate,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
    };
  }

  public populate(data: ExternalUser): void {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.avatar = data.avatar || '';
    this.publicationsCount = 0;
    this.subscribersCount = 0;
    this.registrationDate = dayjs().format('DD-MM-YYYY');
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
