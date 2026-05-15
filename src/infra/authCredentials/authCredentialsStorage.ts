import { AuthUser } from "@domain";

import { storage } from "../storage";

const AUTH_KEY = "@Auth";

async function set(user: AuthUser): Promise<void> {
  await storage.setItem(AUTH_KEY, user);
}

async function get(): Promise<AuthUser | null> {
  const user = await storage.getItem<AuthUser>(AUTH_KEY);
  return user;
}

async function remove(): Promise<void> {
  await storage.removeItem(AUTH_KEY);
}

export const authCredentialsStorage = { set, get, remove };
