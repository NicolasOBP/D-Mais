import { FlatList, ScrollView } from "react-native"

import type { ProductCartScreen } from "@domain"

import { useAppTheme } from "@theme"
import { useNumberFormat } from "@utils"

import { Box, Text } from "@core-components"

import { SellsProductCard } from "./SellsProductCard"

type Props = {
	cartItems: ProductCartScreen[]
	totalPrice: number
}

export function SellsProductsList({ cartItems, totalPrice }: Props) {
	const { spacing } = useAppTheme()

	return (
		<Box pb="s8">
			<Box flexDirection="row" justifyContent="space-between" pr="s16">
				<Text variant="title12" mb="s12" paddingHorizontal="default">
					Produtos
				</Text>
				<Text variant="title12">
					Total:{" "}
					<Text variant="title14" color="green">
						{useNumberFormat.toBRLCurrency(totalPrice)}
					</Text>
				</Text>
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
