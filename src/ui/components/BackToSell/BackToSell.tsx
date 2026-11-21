import { router, usePathname } from "expo-router"
import { useEffect } from "react"

import Animated, {
	Easing,
	cancelAnimation,
	createAnimatedComponent,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated"

import { useSellSendCart } from "@domain"
import {
	useBackToSellService,
	useBackToSellState,
	useBackgroundOrderService,
	useCartService,
} from "@infra"

import { useAppTheme } from "@theme"

import { Box, PressableBox, Text } from "@core-components"

import { useAuthCheckLeftQuota } from "../../../domain/auth/useCases/useAuthCheckLeftQuota"
import { Icon } from "../Icon"

import { useBackToSellAnimation } from "./useBackToSellAnimation"

const AnimatedPressableBox = createAnimatedComponent(PressableBox)

const ANIMATION_DURATION = 600

export function BackToSell() {
	const { spacing } = useAppTheme()
	const { cart } = useCartService()
	const pathname = usePathname()
	const { hasVisitedSell, showBackToSellButton, completedSell } = useBackToSellState()
	const { markVisitedSell, setShowBackToSell, resetBackToSell } = useBackToSellService()
	const { disableBackgroundOrderSaving } = useBackgroundOrderService()
	const progress = useSharedValue(showBackToSellButton ? 1 : 0)

	const { checkLeftQuota } = useAuthCheckLeftQuota({
		onSuccess: () => {
			sendCart(
				cart.getSelectedProducts().map((product) => ({
					C_CDPRO: product.id,
					C_CDEST: product.inventory.id,
					C_QTVEN: product.volume,
				})),
			)
		},
	})
	const { mutate: sendCart, isPending } = useSellSendCart({
		onSuccess: () => {
			router.push("/sell")
		},
		onError: () => {
			resetBackToSell()
		},
	})

	const loadingProgress = useSharedValue(isPending ? 1 : 0)

	useEffect(() => {
		const activeRoute = pathname?.split("/").filter(Boolean).pop() ?? ""

		if (activeRoute === "sell") {
			markVisitedSell()
			setShowBackToSell(false)
			return
		}

		if (activeRoute === "cart") {
			resetBackToSell()
			disableBackgroundOrderSaving()
			return
		}

		if (["home", "orders"].includes(activeRoute) && !completedSell) {
			setShowBackToSell(hasVisitedSell)
			return
		}

		setShowBackToSell(false)
	}, [
		pathname,
		hasVisitedSell,
		markVisitedSell,
		resetBackToSell,
		disableBackgroundOrderSaving,
		setShowBackToSell,
		completedSell,
	])

	useEffect(() => {
		progress.value = withTiming(showBackToSellButton ? 1 : 0, {
			duration: ANIMATION_DURATION,
			easing: Easing.ease,
		})
	}, [progress, showBackToSellButton])

	useEffect(() => {
		if (isPending) {
			loadingProgress.value = withRepeat(
				withTiming(360, { duration: 1000, easing: Easing.linear }),
				-1,
				false,
			)
		} else {
			cancelAnimation(loadingProgress)
			loadingProgress.value = withTiming(0, { duration: 300 })
		}
	}, [loadingProgress, isPending])

	function handlePress() {
		checkLeftQuota(cart.getSelectedVolume())
	}

	const { showBackToSellButtonAnimation, loadingAnimation } = useBackToSellAnimation({
		progress,
		loadingProgress,
	})

	return (
		<AnimatedPressableBox
			onPress={handlePress}
			disabled={!showBackToSellButton}
			style={[
				showBackToSellButtonAnimation,
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
				{isPending ? (
					<Animated.View style={loadingAnimation}>
						<Icon name="loading" size={35} color="contrastPrimary" />
					</Animated.View>
				) : (
					<Text variant="text12Bold" textAlign="center">
						Voltar para{`\n`}Pedido
					</Text>
				)}
			</Box>
		</AnimatedPressableBox>
	)
}
