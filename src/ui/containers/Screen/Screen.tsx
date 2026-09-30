import type { PropsWithChildren } from "react"
import { Pressable, ScrollView, View, type ViewStyle } from "react-native"

import { useAppTheme } from "@theme"
import { useHideKeyboard } from "@utils"

export function Screen({
	children,
	scrollable = false,
	noHorizontalPadding = false,
	...viewProps
}: PropsWithChildren<ViewStyle> & {
	scrollable?: boolean
	noHorizontalPadding?: boolean
}) {
	const { colors, spacing } = useAppTheme()

	const Container = scrollable ? ScrollView : View

	return (
		<Container
			{...viewProps}
			style={{
				flex: 1,
				backgroundColor: colors.background,
				paddingHorizontal: noHorizontalPadding ? 0 : spacing.default,
			}}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps="handled"
		>
			<Pressable style={{ flex: 1 }} onPress={useHideKeyboard}>
				{children}
			</Pressable>
		</Container>
	)
}
