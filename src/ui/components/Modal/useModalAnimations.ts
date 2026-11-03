import {
	type DerivedValue,
	type SharedValue,
	interpolate,
	useAnimatedStyle,
	withDelay,
	withTiming,
} from "react-native-reanimated"

import { useAppTheme } from "@theme"

type Props = {
	modalOpen: SharedValue<boolean>
	progress: DerivedValue<number>
}

export const MODAL_ANIMATION_DURATION = 1000

export function useModalAnimations({ modalOpen, progress }: Props) {
	const { colors, borderRadii } = useAppTheme()
	const backdropAnimatedStyle = useAnimatedStyle(() => ({
		zIndex: modalOpen.value
			? 10
			: withDelay(MODAL_ANIMATION_DURATION, withTiming(-1, { duration: 0 })),
		opacity: 1 - progress.value,
	}))

	const modalAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(progress.value, [1, 0], [0.3, 1]),
			},
		],
		backgroundColor: colors.background,
		borderRadius: borderRadii.default,
	}))

	return { backdropAnimatedStyle, modalAnimatedStyle }
}
