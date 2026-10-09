import { createMMKV } from "react-native-mmkv"
import type { StateStorage } from "zustand/middleware"

import type { Storage } from "../storage"

const MMKVInstance = createMMKV()

export const MMKVStorage: Storage = {
	getItem: (key) => {
		const item = MMKVInstance.getString(key)

		if (item) {
			return JSON.parse(item)
		}
		return null
	},
	setItem: async (key, value) => {
		MMKVInstance.set(key, JSON.stringify(value))
	},
	removeItem: async (key) => {
		MMKVInstance.remove(key)
	},
}

export const zustandStorage: StateStorage = {
	setItem: (name, value) => {
		return MMKVInstance.set(name, value)
	},
	getItem: (name) => {
		const value = MMKVInstance.getString(name)
		return value ?? null
	},
	removeItem: (name) => {
		return MMKVInstance.remove(name)
	},
}
