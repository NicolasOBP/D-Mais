import { type Href, router } from "expo-router"

import { Box, Text } from "@core-components"

import { Icon } from "../Icon"

export function ScreenHeader({
	title,
	canGoBack,
	noMargin,
	goBackTo,
}: {
	title: string
	canGoBack?: boolean
	goBackTo?: Href
	noMargin?: boolean
}) {
	const backEnabled = canGoBack || !!goBackTo

	function handleGoBack() {
		if (goBackTo) {
			router.navigate(goBackTo)
		} else {
			router.back()
		}
	}

	return (
		<Box mt="s10" ml={noMargin ? undefined : "s10"} paddingHorizontal="default">
			<Text variant="title24Bold">{title}</Text>
			{backEnabled && (
				<Box ml="s10" mt="s12" alignItems="flex-start">
					<Icon name="arrowLeft" onPress={handleGoBack} hitSlop={4} />
				</Box>
			)}
		</Box>
	)
}
