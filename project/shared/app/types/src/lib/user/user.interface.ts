export interface User {
  id?: string;
  registrationDate?: string;
  publicationsCount?: number;
  subscribersCount?: number;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
}
