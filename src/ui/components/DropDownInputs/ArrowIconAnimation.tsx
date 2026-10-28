import { useEffect } from "react"
import { StyleSheet } from "react-native"

import Animated, {
	Easing,
	ReanimatedLogLevel,
	type SharedValue,
	configureReanimatedLogger,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

import { Box } from "@core-components"

import { Icon } from "../Icon"
import type { IconProps } from "../Icon/Icon"

configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false,
})

export type ArrowIconAnimationProps = {
	progress: SharedValue<number>
	closeDropdown: () => void
	openDropdown: () => void
	onErrorPress: () => void
	isOpen: SharedValue<boolean>
	color?: IconProps["color"]
	isError: boolean
	notShowArrow?: boolean
}

export function ArrowIconAnimation({
	closeDropdown,
	openDropdown,
	progress,
	isOpen,
	isError,
	onErrorPress,
	color,
	notShowArrow = false,
}: ArrowIconAnimationProps) {
	const iconTransition = useSharedValue(isError ? 1 : 0)

	useEffect(() => {
		iconTransition.value = withTiming(isError ? 1 : 0, {
			duration: 500,
			easing: Easing.inOut(Easing.cubic),
		})
	}, [iconTransition, isError])

	const arrowAnimation = useAnimatedStyle(() => ({
		transform: [
			{ rotate: `${interpolate(progress.value, [0, 1], [0, -180])}deg` },
			{ scale: interpolate(iconTransition.value, [0, 0.5, 1], [1, 0, 0]) },
		],
	}))

	const refreshAnimation = useAnimatedStyle(() => ({
		transform: [{ scale: interpolate(iconTransition.value, [0, 0.5, 1], [0, 0, 1]) }],
	}))

	function handleIconAction() {
		if (isOpen.value) {
			closeDropdown()
		} else {
			openDropdown()
		}
	}

	return (
		<Box pr="s4">
			<Box width={24} height={24} alignItems="center" justifyContent="center">
				{!notShowArrow && (
					<Animated.View
						pointerEvents={isError ? "none" : "auto"}
						style={[style.containersStyle, arrowAnimation]}
					>
						<Icon name="chevronDown" onPress={handleIconAction} color={color} />
					</Animated.View>
				)}

				<Animated.View
					pointerEvents={isError ? "auto" : "none"}
					style={[style.containersStyle, refreshAnimation]}
				>
					<Icon name="refresh" color={color} size={24} onPress={onErrorPress} hitSlop={10} />
				</Animated.View>
			</Box>
		</Box>
	)
}

const style = StyleSheet.create({
	containersStyle: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		alignItems: "center",
		justifyContent: "center",
	},
})
