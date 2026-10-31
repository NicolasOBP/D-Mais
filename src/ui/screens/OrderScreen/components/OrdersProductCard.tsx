import { Dimensions } from "react-native"

import type { Order } from "@domain"

import { useNumberFormat } from "@utils"

import { Box, type BoxProps, PressableBox, Text } from "@core-components"

import { statusStyleMap } from "./statusStyleMap"

export interface OrdersProductCardProps {
	order: Order
	onPress: () => void
}

const SCREEN_WIDTH = Dimensions.get("screen").width
const CARD_WIDTH = SCREEN_WIDTH * 0.43

export function OrdersProductCard({ order, onPress }: OrdersProductCardProps) {
	const orderStatus = statusStyleMap[order.status]

	return (
		<PressableBox {...cardBoxStyle} onPress={onPress}>
			<Box {...statusBoxStyle} {...orderStatus.style}>
				<Text variant="title12" textAlign="center">
					{orderStatus.label}
				</Text>
			</Box>

			<Box flex={1} p="s6" justifyContent="space-between">
				<Text variant="title12" pb="s12">
					{order.client.name}
				</Text>

				<Box pb="s12" g="s4">
					{order.products.map((product) => (
						<Box flexDirection="row" alignItems="center" key={product.cartId}>
							<Text variant="text10" color="primary" flexGrow={1} flexShrink={1}>
								{product.title}
							</Text>

							<Text variant="text10" color="primary" textAlign="right">
								{product.volume} L
							</Text>
						</Box>
					))}
				</Box>

				<Text variant="title14" textAlign="right">
					{useNumberFormat.toBRLCurrency(order.totalPrice)}
				</Text>
			</Box>
		</PressableBox>
	)
}

const cardBoxStyle: BoxProps = {
	borderRadius: "default",
	borderWidth: 1,
	borderColor: "primary",
	backgroundColor: "background",
	overflow: "hidden",
	width: CARD_WIDTH,
}

const statusBoxStyle: BoxProps = {
	paddingVertical: "s4",
	paddingHorizontal: "s48",
	alignItems: "center",
	justifyContent: "center",
}
