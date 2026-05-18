import { SplashScreen } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { AuthUser } from "@domain";

import { authContextStorage } from "../authContextStorage";
import { AuthState } from "../authCredentialsType";

export const AuthContext = createContext<AuthState>({
  authUser: null,
  isReady: false,
  saveAuthUser: async () => {},
  removeAuthUser: async () => {},
});

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  async function saveAuthUser(user: AuthUser) {
    await authContextStorage.set(user);
    setAuthUser(user);
  }

  async function removeAuthUser() {
    await authContextStorage.remove();
    setAuthUser(null);
  }

  async function loadAuthUser() {
    try {
      const user = await authContextStorage.get();
      if (user) {
        setAuthUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  }

  useEffect(() => {
    loadAuthUser();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{ authUser, isReady, saveAuthUser, removeAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
