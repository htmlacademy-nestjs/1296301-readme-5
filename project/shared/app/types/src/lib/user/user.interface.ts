export interface User {
  id?: string;
  registrationDate?: string;
  publicationsCount?: number;
  subscribersCount?: number;
  email: string;
  userName: string;
  avatar?: string;
}
