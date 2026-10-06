import { router, useLocalSearchParams } from "expo-router"

import {
	type OrderDetails,
	useOrderRemoveFromStorage,
	useOrdersList,
	useOrdersListStorage,
} from "@domain"

import {
	EmptyList,
	LoadingListState,
	ScreenHeader,
	SellsForm,
	SellsProductsList,
	useModal,
} from "@components"
import { Screen } from "@containers"
import { Box, Button, Text } from "@core-components"

import { useSellScreen } from "../SellsScreen/useSellScreen"

export function OrderDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { data: orders, isLoading } = useOrdersList()
	const { data: storageOrders, isLoading: isLoadingStorage } = useOrdersListStorage()
	const order =
		orders?.find((item) => item.id === Number(id)) ??
		storageOrders?.find((item) => item.id === Number(id))

	if (isLoading || isLoadingStorage) {
		return (
			<Screen>
				<LoadingListState screen="Orders" />
			</Screen>
		)
	}

	if (!order) {
		return (
			<Screen>
				<ScreenHeader title="Pedido" canGoBack />
				<EmptyList desc="Pedido não encontrado" />
			</Screen>
		)
	}

	return <OrderDetailsContent order={order} />
}

function OrderDetailsContent({ order }: { order: OrderDetails }) {
	const { showModal, closeModal } = useModal()
	const { mutate: removeOrderFromStorage } = useOrderRemoveFromStorage({
		onSuccess: () => {
			closeModal()
			router.back()
		},
	})
	const title =
		order.status === "completed"
			? "Pedido Enviado"
			: order.status === "pending"
				? "Pedido Pendente"
				: "Pedido Cancelado"
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
			<ScreenHeader title={title} status={order.status} canGoBack />

			<SellsForm
				fareControl={fareControl}
				readOnly={order.status !== "pending"}
				control={control}
				paymentTermsControl={paymentTermsControl}
			/>

			<SellsProductsList
				cartItems={order.products}
				totalPrice={totalPrice}
				isPendingTotalPrice={isTotalPricePending}
			/>

			{order.status === "completed" && (
				<Box flex={1} alignItems="center" paddingVertical="s20">
					<Button
						lable="Venda enviada"
						variant="disabled"
						disabled
						paddingVertical="s14"
						paddingHorizontal="s20"
					/>
				</Box>
			)}

			{order.status === "pending" && (
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
			)}
		</Screen>
	)
}
