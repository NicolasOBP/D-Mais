import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay = 500, minRequiredLength?: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [value])

	if (typeof debouncedValue === "string" && minRequiredLength) {
		if (debouncedValue.length < minRequiredLength) return ""

		return debouncedValue
	}

	return debouncedValue
}
