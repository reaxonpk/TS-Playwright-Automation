import { CredentialsSet } from "./types";

export const CREDENTIALS: CredentialsSet = {
  validUser: {
    username: "standard_user",
    password: "secret_sauce",
  },
  lockedUser: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  invalidUser: {
    username: "invalid_user",
    password: "wrong_password",
  },
};
