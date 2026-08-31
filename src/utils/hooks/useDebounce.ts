import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay = 500) {
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

	return debouncedValue
}
