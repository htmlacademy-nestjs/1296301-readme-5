export enum AuthUserInfo {
  NotValidEmail = 'The email is not valid'
}

export const NameLength = {
  Min: 3,
  Max: 50,
} as const;

export enum PasswordLength {
  Min = 6,
  Max = 12
}
