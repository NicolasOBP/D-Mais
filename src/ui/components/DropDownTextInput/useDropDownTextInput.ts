import { useState } from "react"

import { Easing, useSharedValue, withTiming } from "react-native-reanimated"

export function useDropDownTextInput() {
	const isOpen = useSharedValue(false)
	const progress = useSharedValue(0)
	const bodyProgress = useSharedValue(0)
	const [topOffset, setTopOffset] = useState(0)

	function openDropdown() {
		isOpen.value = true
		progress.value = withTiming(1, {
			duration: 800,
			easing: Easing.linear,
		})
		bodyProgress.value = withTiming(1, {
			duration: 800,
			easing: Easing.bounce,
		})
	}

	function closeDropdown() {
		isOpen.value = false
		progress.value = withTiming(0, {
			duration: 800,
			easing: Easing.linear,
		})
		bodyProgress.value = withTiming(0, {
			duration: 800,
			easing: Easing.exp,
		})
	}

	return {
		openDropdown,
		closeDropdown,
		isOpen,
		bodyProgress,
		progress,
		topOffset,
		setTopOffset,
	}
}
