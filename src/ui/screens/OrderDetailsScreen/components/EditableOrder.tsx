import { router } from "expo-router"

import { type OrderDetails, useOrderRemoveFromStorage } from "@domain"

import { ScreenHeader, SellsForm, SellsProductsList, useModal } from "@components"
import { Screen } from "@containers"
import { Box, Button, Text } from "@core-components"

import { useSellScreen } from "../../SellsScreen/useSellScreen"

export function EditAbleOrder({ order }: { order: OrderDetails }) {
	const { showModal, closeModal } = useModal()
	const { mutate: removeOrderFromStorage } = useOrderRemoveFromStorage({
		onSuccess: () => {
			closeModal()
			router.back()
		},
	})

	const { fareControl, paymentTermsControl, isTotalPricePending, totalPrice, control } =
		useSellScreen({ cartItems: order.products, order })

	function handleShowDeleteModal() {
		showModal({
			headerTitle: "EXCLUIR PEDIDO",
			BodyComponent: (
				<Box paddingHorizontal="s48">
					<Text variant="title16" color="errorText" textAlign="center">
						Deseja realmente excluir esse pedido?
					</Text>
					<Text variant="title16" color="errorText" textAlign="center">
						Essa ação não poderá ser desfeita.
					</Text>
				</Box>
			),
			footerButton: {
				twoButtonFooter: {
					labelCancel: "Cancelar",
					labelConfirm: "Deletar",
					onConfirm: () => removeOrderFromStorage({ orderId: order.id }),
				},
			},
		})
	}

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
				/>
			</Box>
		</Screen>
	)
}
