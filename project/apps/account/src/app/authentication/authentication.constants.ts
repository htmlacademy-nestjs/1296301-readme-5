export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_WRONG = 'Email or password is wrong';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_NOT_CORRECT_PASSWORD = 'The provided current password is incorrect';

export enum UserInfo {
  Register = 'The new user has been successfully created.',
  Login = 'User has been successfully logged.',
  WrongPassword = 'Password or Login is wrong.',
  UpdatePassword = 'User password has been successfully changed.',
  FoundUser = 'User found',
  RefreshToken = 'Get a new access/refresh tokens',
}
