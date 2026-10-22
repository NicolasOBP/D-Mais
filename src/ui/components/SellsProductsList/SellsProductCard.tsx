import type { ProductCart } from "@domain"

import { useNumberFormat } from "@utils"

import { Box, type BoxProps, PressableBox, Text } from "@core-components"

import { TotalPriceLoadingAnimation } from "./TotalPriceLoadingAnimation"

interface SellsProductCardProps {
	item: Pick<ProductCart, "cartId" | "title" | "volume" | "price" | "totalPrice">
	isPendingTotalPrice: boolean | undefined
}

export function SellsProductCard({ item, isPendingTotalPrice }: SellsProductCardProps) {
	const finalPrice = item.totalPrice

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
					{isPendingTotalPrice ? (
						<TotalPriceLoadingAnimation width={45} hight={18} bgColor="primaryLight" />
					) : (
						<Text variant="title12" numberOfLines={1}>
							{item.price === undefined
								? "Não informado"
								: useNumberFormat.toBRLCurrency(item.price)}
						</Text>
					)}
				</Box>
			</Box>
			<Box>
				<Text variant="text12" color="gray1" mb="s4">
					Total
				</Text>
				{isPendingTotalPrice ? (
					<TotalPriceLoadingAnimation width={60} hight={18} />
				) : (
					<Text variant="title12" color="green" numberOfLines={1}>
						{useNumberFormat.toBRLCurrency(finalPrice)}
					</Text>
				)}
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
