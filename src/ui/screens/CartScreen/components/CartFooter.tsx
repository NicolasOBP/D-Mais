import { useNumberFormat } from "@utils"

import { Box, type BoxProps, Text } from "@core-components"

import { MorphingSubmitButton } from "./MorphingSubmitButton"

type Props = {
	totalPrice: number | undefined
	totalItems: number | undefined
	isPending: boolean
	onCheckout: () => void
}

export function CartFooter({ isPending, onCheckout, totalItems, totalPrice }: Props) {
	const totalItemsText = totalItems === 1 ? "item" : "itens"

	return (
		<Box style={{ width: "100%" }} {...containerBoxStyle}>
			<Box {...metadataBoxStyle}>
				<Text mb="s20" variant="text12Bold">
					Total: {useNumberFormat.toBRLCurrency(totalPrice ?? 0)}
				</Text>
				<Text variant="text12Bold">
					{totalItems ?? 0} {totalItemsText}
				</Text>
			</Box>

			<Box {...checkoutBoxStyle}>
				<MorphingSubmitButton isPending={isPending} onCheckout={onCheckout} />
			</Box>
		</Box>
	)
}

const containerBoxStyle: BoxProps = {
	bg: "carrot",
	flexDirection: "row",
	justifyContent: "space-between",
}

const metadataBoxStyle: BoxProps = {
	bg: "primary",
	flex: 1,
	paddingVertical: "s8",
	pl: "s10",
}

const checkoutBoxStyle: BoxProps = {
	justifyContent: "center",
	bg: "primary",
	paddingVertical: "s8",
	paddingHorizontal: "s10",
	borderLeftWidth: 2,
	borderLeftColor: "white",
	alignItems: "center",
}
