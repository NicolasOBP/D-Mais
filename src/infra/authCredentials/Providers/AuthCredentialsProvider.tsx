import { createContext, useEffect, useState } from "react";

import { AuthUser } from "@domain";

import { authCredentialsStorage } from "../authCredentialsStorage";
import { AuthCredentialsService } from "../authCredentialsType";

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  isLoading: true,
  removeCredentials: async () => {},
  saveCredentials: async () => {},
  user: null,
});

export function AuthCredentialsProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startAuthCredentials();
  }, []);

  async function startAuthCredentials() {
    try {
      const user = await authCredentialsStorage.get();

      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(user: AuthUser): Promise<void> {
    authCredentialsStorage.set(user);

    setUser(user);
  }

  async function removeCredentials(): Promise<void> {
    authCredentialsStorage.remove();

    setUser(null);
  }

  return (
    <AuthCredentialsContext.Provider
      value={{
        isLoading,
        saveCredentials,
        removeCredentials,
        user,
      }}
    >
      {children}
    </AuthCredentialsContext.Provider>
  );
}
