function generateId(): number {
	return Date.now() * 1000 + Math.random() * 1000
}

export const idUtils = { generateId }
