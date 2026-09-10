import type { Inventory, InventoryProduct } from "@domain"

import { useNumberFormat } from "@utils"

import { Box, PressableBox, Text } from "@core-components"

export interface InventoryScreenCardProps {
	product: InventoryProduct
	affiliate: Inventory["affiliate"]
}

export function InventoryScreenCard({ product, affiliate }: InventoryScreenCardProps) {
	return (
		<PressableBox
			borderWidth={1}
			borderColor="primary"
			borderRadius="default"
			backgroundColor="background"
			paddingHorizontal="s14"
			paddingVertical="s10"
			mb="s12"
		>
			<Text variant="title16" mb="s10">
				{product.title}
			</Text>

			<Box flexDirection="row">
				<Box flex={1} mr="s10">
					<Text variant="text10" color="primary" mb="s4">
						Código do Produto
					</Text>
					<Text variant="mediumText10" color="primary">
						{product.id}
					</Text>
				</Box>

				<Box flex={1}>
					<Text variant="text10" color="primary" mb="s4">
						Parceiro
					</Text>
					<Text variant="mediumText10" color="primary">
						{affiliate}
					</Text>
				</Box>

				<Box flex={1}>
					<Text variant="text10" color="primary" mb="s4">
						Qntd. Disponível
					</Text>
					<Text variant="text12Bold" color="primary">
						{useNumberFormat.formatNumberWithThousands(product.volumeAvailable)} L
					</Text>
				</Box>
			</Box>
		</PressableBox>
	)
}
