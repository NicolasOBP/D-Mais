import type { ProductCart } from "@domain"

import { useNumberFormat } from "@utils"

import { Box, type BoxProps, PressableBox, Text } from "@core-components"

interface SellsProductCardProps {
	item: ProductCart
}

export function SellsProductCard({ item }: SellsProductCardProps) {
	const finalPrice = item.price * item.volume

	return (
		<PressableBox {...containerBoxStyle}>
			<Text variant="title14" numberOfLines={1}>
				{item.title}
			</Text>

			<Box flexDirection="row" justifyContent="space-between" gap="s12">
				<Box>
					<Text variant="text12" color="gray1" mb="s4">
						Volume
					</Text>
					<Text variant="title12" numberOfLines={1}>
						{useNumberFormat.formatNumberWithThousands(item.volume)} L
					</Text>
				</Box>

				<Box>
					<Text variant="text12" color="gray1" mb="s4">
						Preço
					</Text>
					<Text variant="title12" numberOfLines={1}>
						{useNumberFormat.toBRLCurrency(item.price)}
					</Text>
				</Box>
			</Box>
			<Box>
				<Text variant="text12" color="gray1" mb="s4">
					Total
				</Text>
				<Text variant="title12" color="green" numberOfLines={1}>
					{useNumberFormat.toBRLCurrency(finalPrice)}
				</Text>
			</Box>
		</PressableBox>
	)
}

const containerBoxStyle: BoxProps = {
	padding: "s16",
	paddingVertical: "s8",
	borderRadius: "default",
	backgroundColor: "gray5",
	borderWidth: 1,
	borderColor: "gray3",
	gap: "s8",
	marginRight: "s12",
	width: 180,
}
