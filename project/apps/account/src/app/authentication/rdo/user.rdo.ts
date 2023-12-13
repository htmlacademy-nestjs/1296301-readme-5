import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar?: string;

  @Expose()
  public firstname: string;

  @Expose()
  public lastname: string;

  @Expose()
  public registrationDate: string;

  @Expose()
  public publicationsCount: string;

  @Expose()
  public subscribersCount: string;
}
