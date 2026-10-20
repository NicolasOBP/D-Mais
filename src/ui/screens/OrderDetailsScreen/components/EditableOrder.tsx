import type { OrderDetails } from "@domain"

import { ScreenHeader, SellsForm, SellsProductsList } from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

import { useEditableOrder } from "./useEditableOrder"

export function EditAbleOrder({ order }: { order: OrderDetails }) {
	const {
		handleSubmit,
		handleShowModal,
		handleShowDeleteModal,
		fareControl,
		paymentTermsControl,
		isTotalPricePending,
		isSendSellPending,
		control,
		totalPrice,
	} = useEditableOrder({
		cartItems: order.products,
		order,
		defaultTotalPrice: order.totalPrice,
	})

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title="Pedido Pendente" status={order.status} canGoBack />

			<SellsForm
				fareControl={fareControl}
				control={control}
				paymentTermsControl={paymentTermsControl}
			/>

			<SellsProductsList
				cartItems={order.products}
				totalPrice={totalPrice}
				isPendingTotalPrice={isTotalPricePending}
			/>

			<Box flexDirection="row" gap="s16" paddingHorizontal="default" paddingVertical="s20">
				<Button
					flex={1}
					lable="Excluir venda"
					variant="error"
					onPress={handleShowDeleteModal}
					paddingVertical="s14"
					paddingHorizontal="s8"
				/>
				<Button
					flex={1}
					lable="Enviar venda"
					variant="primary"
					paddingVertical="s14"
					paddingHorizontal="s8"
					isLoading={isSendSellPending || isTotalPricePending}
					onPress={handleSubmit(handleShowModal)}
				/>
			</Box>
		</Screen>
	)
}
