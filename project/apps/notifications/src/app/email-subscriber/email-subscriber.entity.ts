import { Subscriber, Entity } from '@project/shared/app/types';

export class EmailSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public userName: string;
  public dateNotify: string;

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      userName: this.userName,
      dateNotify: this.dateNotify,
    };
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.userName = data.userName;
    this.dateNotify = data.dateNotify;

    return this;
  }

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity()
      .populate(data);
  }
}
