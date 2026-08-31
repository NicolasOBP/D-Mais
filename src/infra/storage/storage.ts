export interface Storage {
	getItem: <T>(key: string) => Promise<T> | null
	setItem: <T>(key: string, value: T) => Promise<void>
	removeItem: (key: string) => Promise<boolean>
}
// export let storage: Storage = asyncStorage;
export let storage: Storage

export function initializeStorage(storageImpl: Storage) {
	storage = storageImpl
}
