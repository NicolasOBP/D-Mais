import { AuthUser } from "@domain";

export interface AuthCredentialsService {
  user: AuthUser | null;
  saveCredentials: (user: AuthUser) => Promise<void>;
  removeCredentials: () => Promise<void>;
  isLoading: boolean;
}
