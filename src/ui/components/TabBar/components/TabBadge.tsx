import { Box, Text } from "@core-components"

type Props = {
	number: number | string | undefined
	screenName: string
}

export function TabBadge({ number, screenName }: Props) {
	if (!number) return null
	const isOrdersScreen = screenName === "orders"

	return (
		<Box
			bg={isOrdersScreen ? "pendingBadgeText" : "primary"}
			position="absolute"
			right={-12}
			top={-15}
			borderRadius="rounded"
			alignItems="center"
			justifyContent="center"
			minHeight={26}
			minWidth={26}
		>
			<Text variant="text12Bold">{number}</Text>
		</Box>
	)
}
