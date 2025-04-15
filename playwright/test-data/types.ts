export interface UserCredentials {
  username: string;
  password: string;
}

export interface CredentialsSet {
  validUser: UserCredentials;
  lockedUser: UserCredentials;
  invalidUser: UserCredentials;
}
