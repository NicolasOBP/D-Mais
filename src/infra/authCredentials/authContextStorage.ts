import type { AuthUser } from "@domain"

import { storage } from "../storage"

const AUTH_KEY = "@Auth"

async function set(authUser: AuthUser): Promise<void> {
	await storage.setItem(AUTH_KEY, authUser)
}

async function get(): Promise<AuthUser | null> {
	const authUser = await storage.getItem<AuthUser>(AUTH_KEY)
	return authUser
}

async function remove(): Promise<void> {
	await storage.removeItem(AUTH_KEY)
}

export const authContextStorage = { set, get, remove }
