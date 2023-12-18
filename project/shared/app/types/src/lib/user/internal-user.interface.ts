import { User } from './user.interface';

export interface InternalUser extends User {
  id: string;
  registrationDate: string;
  publicationsCount: number;
  subscribersCount: number;
  passwordHash: string;
}
