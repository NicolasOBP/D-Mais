import { router, usePathname } from "expo-router"
import { useEffect } from "react"

import {
	Easing,
	createAnimatedComponent,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

import { useBackToSellService, useBackToSellState, useCartService } from "@infra"

import { useAppTheme } from "@theme"

import { Box, PressableBox, Text } from "@core-components"

import { useAuthCheckLeftQuota } from "../../../domain/auth/useCases/useAuthCheckLeftQuota"

import { useBackToSellAnimation } from "./useBackToSellAnimation"

const AnimatedPressableBox = createAnimatedComponent(PressableBox)

const ANIMATION_DURATION = 600

export function BackToSell() {
	const { spacing } = useAppTheme()
	const { checkLeftQuota } = useAuthCheckLeftQuota({
		onSuccess: () => {
			router.push("/sell")
		},
	})
	const { getSelectedVolume } = useCartService()
	const pathname = usePathname()
	const { hasVisitedSell, showBackToSellButton, completedSell } = useBackToSellState()
	const { markVisitedSell, setShowBackToSell, resetBackToSell } = useBackToSellService()
	const progress = useSharedValue(showBackToSellButton ? 1 : 0)

	useEffect(() => {
		const activeRoute = pathname?.split("/").filter(Boolean).pop() ?? ""

		if (activeRoute === "sell") {
			markVisitedSell()
			setShowBackToSell(false)
			return
		}

		if (activeRoute === "cart") {
			resetBackToSell()
			return
		}

		if (["home", "orders"].includes(activeRoute) && !completedSell) {
			setShowBackToSell(hasVisitedSell)
			return
		}

		setShowBackToSell(false)
	}, [pathname, hasVisitedSell, markVisitedSell, resetBackToSell, setShowBackToSell, completedSell])

	useEffect(() => {
		progress.value = withTiming(showBackToSellButton ? 1 : 0, {
			duration: ANIMATION_DURATION,
			easing: Easing.ease,
		})
	}, [progress, showBackToSellButton])

	function handlePress() {
		checkLeftQuota(getSelectedVolume())
	}

	const animatedStyle = useBackToSellAnimation(progress)

	return (
		<AnimatedPressableBox
			onPress={handlePress}
			disabled={!showBackToSellButton}
			style={[
				animatedStyle,
				{
					position: "absolute",
					top: spacing.s96,
					right: -35,
					zIndex: 1,
					padding: spacing.s10,
					alignItems: "center",
					justifyContent: "center",
				},
			]}
		>
			<Box alignItems="center" justifyContent="center">
				<Text variant="text12Bold" textAlign="center">
					Voltar para{`\n`}Venda
				</Text>
			</Box>
		</AnimatedPressableBox>
	)
}
