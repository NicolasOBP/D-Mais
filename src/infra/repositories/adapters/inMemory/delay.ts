export function delay() {
	return new Promise<void>((resolve) => setTimeout(resolve, 1500))
}
