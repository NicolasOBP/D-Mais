import { AuthUser } from "./AuthUser";

export interface IAuthRepo {
  signIn: (
    company: string,
    password: string,
    userName: string,
  ) => Promise<AuthUser>;
  signOut: () => Promise<void>;
}
