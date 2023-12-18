import { User } from './user.interface';

export interface ExternalUser extends User {
  password: string;
}
