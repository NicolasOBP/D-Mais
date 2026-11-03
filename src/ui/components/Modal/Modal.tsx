import { useEffect } from "react"
import { Dimensions, Pressable, StyleSheet } from "react-native"

import Animated, { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated"

import { useAppTheme } from "@theme"
import { useHideKeyboard } from "@utils"

import { Box } from "@core-components"

import { ModalFooter } from "./components/ModalFooter"
import { ModalHeader } from "./components/ModalHeader"
import { useModal } from "./useModal"
import { MODAL_ANIMATION_DURATION, useModalAnimations } from "./useModalAnimations"
import { validateModalState } from "./useModalError"

const WIDTH_SCREEN = Dimensions.get("screen").width

export function Modal() {
	const { spacing } = useAppTheme()
	const { modal } = useModal()
	const modalOpen = useSharedValue(false)
	const progress = useDerivedValue(() =>
		withTiming(Number(!modalOpen.value), {
			duration: MODAL_ANIMATION_DURATION,
		}),
	)
	const widthValue = WIDTH_SCREEN - spacing.s16 * 2

	const { backdropAnimatedStyle, modalAnimatedStyle } = useModalAnimations({
		modalOpen,
		progress,
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		if (modal.isModalOpen) {
			validateModalState(modal)

			modalOpen.value = !modalOpen.value
		} else {
			modalOpen.value = false
		}
	}, [modal.isModalOpen])

	return (
		<Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
			<Pressable
				onPress={useHideKeyboard}
				style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			>
				<Animated.View style={modalAnimatedStyle}>
					<Box p="s16" borderRadius="default" width={widthValue} gap="s32">
						{modal.HeaderComponent ?? (
							<ModalHeader
								title={modal.headerTitle}
								subtitle={modal.headerSubtitle}
								showCloseButton={modal.showCloseButton}
							/>
						)}

						{modal.BodyComponent}

						{modal.footerButton ? <ModalFooter {...modal.footerButton} /> : modal.FooterComponent}
					</Box>
				</Animated.View>
			</Pressable>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
})
