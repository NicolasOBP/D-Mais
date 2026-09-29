import { FlatList, ScrollView } from "react-native"

import type { ProductCart } from "@domain"

import { useAppTheme } from "@theme"
import { useNumberFormat } from "@utils"

import { Box, Text } from "@core-components"

import { SellsProductCard } from "./SellsProductCard"
import { TotalPriceLoadingAnimation } from "./TotalPriceLoadingAnimation"

type Props = {
	cartItems: Pick<ProductCart, "cartId" | "title" | "volume" | "price">[]
	totalPrice: number
	isPendingTotalPrice: boolean
}

export function SellsProductsList({ cartItems, totalPrice, isPendingTotalPrice }: Props) {
	const { spacing } = useAppTheme()

	return (
		<Box pb="s8">
			<Box flexDirection="row" justifyContent="space-between" alignItems="center" pr="s16">
				<Text variant="title12" mb="s12" paddingHorizontal="default">
					Produtos
				</Text>
				<Box flexDirection="row" alignItems="center" gap="s4">
					<Text variant="title12">Total:</Text>
					{isPendingTotalPrice ? (
						<TotalPriceLoadingAnimation />
					) : (
						<Text variant="title14" color="green">
							{useNumberFormat.toBRLCurrency(totalPrice)}
						</Text>
					)}
				</Box>
			</Box>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				directionalLockEnabled={true}
				alwaysBounceVertical={false}
			>
				<FlatList
					key={cartItems.length}
					data={cartItems}
					renderItem={({ item }) => <SellsProductCard key={item.cartId} item={item} />}
					keyExtractor={(item) => item.cartId.toString()}
					numColumns={Math.ceil(cartItems.length / 2)}
					contentContainerStyle={{
						gap: spacing.s12,
					}}
					style={{ paddingLeft: spacing.default, paddingRight: spacing.s8 }}
				/>
			</ScrollView>
		</Box>
	)
}
