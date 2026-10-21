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
		handleCalculateFarePrice,
		getValues,
		setValue,
		isTotalPricePending,
		isSendSellPending,
		control,
		totalPrice,
		farePrice,
		orderProducts,
	} = useEditableOrder({
		cartItems: order.products,
		order,
		defaultTotalPrice: order.totalPrice,
	})

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title="Pedido Pendente" status={order.status} canGoBack />

			<SellsForm
				getValues={getValues}
				setValue={setValue}
				control={control}
				isTotalPricePending={isTotalPricePending}
				handleCalculateFarePrice={handleCalculateFarePrice}
			/>

			<SellsProductsList
				cartItems={orderProducts}
				totalPrice={totalPrice}
				farePrice={farePrice}
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
