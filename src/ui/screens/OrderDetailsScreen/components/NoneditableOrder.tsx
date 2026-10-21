import type { OrderDetails } from "@domain"

import { useSellForm } from "@schemas"

import { ScreenHeader, SellsForm, SellsProductsList } from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

export function NonEditableOrder({ order }: { order: OrderDetails }) {
	const title = order.status === "completed" ? "Pedido Enviado" : "Pedido Cancelado"

	const { control } = useSellForm(order)

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title={title} status={order.status} canGoBack />

			<SellsForm readOnly={true} control={control} />

			<SellsProductsList
				cartItems={order.products}
				totalPrice={order.totalPrice}
				farePrice={order.farePrice}
			/>

			<Box flex={1} alignItems="center" paddingVertical="s20">
				<Button
					lable="Venda enviada"
					variant="disabled"
					disabled
					paddingVertical="s14"
					paddingHorizontal="s20"
				/>
			</Box>
		</Screen>
	)
}
