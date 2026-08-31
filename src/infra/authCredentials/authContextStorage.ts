import { storage } from "../storage"

const AUTH_KEY = "@Auth"

async function set(userId: string): Promise<void> {
	await storage.setItem(AUTH_KEY, userId)
}

async function get(): Promise<string | null> {
	const userId = await storage.getItem<string>(AUTH_KEY)
	return userId
}

async function remove(): Promise<void> {
	await storage.removeItem(AUTH_KEY)
}

export const authContextStorage = { set, get, remove }
