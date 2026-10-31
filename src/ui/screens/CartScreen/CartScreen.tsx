import { router } from "expo-router"
import { useRef } from "react"
import type { ListRenderItemInfo } from "react-native"

import { useScrollToTop } from "@react-navigation/native"
import Animated, { LinearTransition } from "react-native-reanimated"

import { type ProductCartScreen, useAuthCheckLeftQuota, useSellSendCart } from "@domain"
import { useCartService, useCartStore, useToast } from "@infra"

import { useAppTheme } from "@theme"

import { EmptyList, ScreenHeader } from "@components"
import { Screen } from "@containers"
import { Box } from "@core-components"

import { CartProductCard } from "./components"
import { CartFooter } from "./components/CartFooter"

export function CartScreen() {
	const { spacing } = useAppTheme()
	const { showToast } = useToast()
	const { selectedItems, totalSelectedPrice, cartProducts } = useCartStore()
	const { cart } = useCartService()
	const { checkLeftQuota, isPending: isCheckingQuota } = useAuthCheckLeftQuota({
		onSuccess: () => {
			sendCart(
				cart.getSelectedProducts().map((product) => ({
					C_CDPRO: product.id,
					C_CDEST: product.inventory.id,
					C_QTVEN: product.volume,
				})),
			)
		},
	})

	const { mutate: sendCart, isPending: isSendingCart } = useSellSendCart({
		onSuccess: () => {
			router.push("/sell")
		},
	})

	const flatListRef = useRef(null)
	useScrollToTop(flatListRef)

	function renderItem({ item }: ListRenderItemInfo<ProductCartScreen>) {
		return (
			<CartProductCard
				product={item}
				onSelectChange={() => cart.toggleProductSelection(item.cartId)}
			/>
		)
	}

	function onCheckout() {
		if (cart.getSelectedProducts().length === 0) {
			showToast({
				type: "warning",
				message: "Seu carrinho está vazio",
				duration: 4000,
			})
			return
		}

		checkLeftQuota(cart.getSelectedVolume())
	}

	return (
		<Screen noHorizontalPadding paddingBottom={spacing.s8}>
			<ScreenHeader title="Carrinho" />

			<Box flex={1} paddingHorizontal="default">
				<Animated.FlatList
					data={cartProducts}
					keyExtractor={(item) => item.cartId.toString()}
					contentContainerStyle={{ paddingTop: spacing.s16 }}
					renderItem={renderItem}
					itemLayoutAnimation={LinearTransition.duration(500)}
					showsVerticalScrollIndicator={false}
					ref={flatListRef}
					ListEmptyComponent={<EmptyList desc="Seu carrinho está vazio" />}
				/>
			</Box>

			<CartFooter
				isPending={isCheckingQuota || isSendingCart}
				onCheckout={onCheckout}
				totalItems={selectedItems}
				totalPrice={totalSelectedPrice}
			/>
		</Screen>
	)
}
