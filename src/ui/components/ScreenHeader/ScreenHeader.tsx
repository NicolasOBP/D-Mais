import { type Href, router } from "expo-router"

import type { OrdersStatus } from "@domain"

import { Box, Text } from "@core-components"

import { Icon } from "../Icon"

export function ScreenHeader({
	title,
	canGoBack,
	noMargin,
	goBackTo,
	status,
}: {
	title: string
	canGoBack?: boolean
	goBackTo?: Href
	noMargin?: boolean
	status?: OrdersStatus
}) {
	const backEnabled = canGoBack || !!goBackTo
	const statusColor =
		status === "pending" ? "pending" : status === "completed" ? "success" : "error"

	function handleGoBack() {
		if (goBackTo) {
			router.navigate(goBackTo)
		} else {
			router.back()
		}
	}

	if (status) {
		return (
			<>
				<Box backgroundColor={statusColor} paddingHorizontal="default" paddingVertical="s8">
					<Text variant="title24Bold">{title}</Text>
				</Box>
				{backEnabled && (
					<Box ml="default" mt="s8" alignItems="flex-start">
						<Icon name="arrowLeft" onPress={handleGoBack} hitSlop={4} />
					</Box>
				)}
			</>
		)
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
