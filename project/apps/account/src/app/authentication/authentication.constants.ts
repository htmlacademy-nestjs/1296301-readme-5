export enum UserInfo {
  ExistUser = 'User with this email exists.',
  Register = 'The new user has been successfully created.',
  Login = 'User has been successfully logged.',
  WrongPassword = 'Password or Login is wrong.',
  UpdatePassword = 'User password has been successfully changed.',
  NotCorrectPassword = 'The provided current password is incorrect',
  FoundUser = 'User found',
  NotFoundUser = 'User not found',
  RefreshToken = 'Get a new access/refresh tokens',
}

export enum HttpClientParam {
  MaxRedirect = 5,
  Timeout = 5000
}
