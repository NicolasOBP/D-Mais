import { Box, PressableBox, Text } from "@core-components"

import { Icon } from "../Icon"

type Props = {
	desc: string
	showRefreshButton?: boolean
	refreshFunction?: () => void
}

export function EmptyList({ desc, refreshFunction, showRefreshButton }: Props) {
	return (
		<Box
			alignSelf="center"
			justifyContent="center"
			alignContent="center"
			alignItems="center"
			pt="s20"
			g="s88"
		>
			<Text variant="title16">{desc}</Text>
			{showRefreshButton && (
				<PressableBox alignItems="center" onPress={refreshFunction}>
					<Icon name="refresh" color="primary" size={80} />
					<Text variant="text12" color="primary" textAlign="center">
						Recarregar
					</Text>
				</PressableBox>
			)}
		</Box>
	)
}
