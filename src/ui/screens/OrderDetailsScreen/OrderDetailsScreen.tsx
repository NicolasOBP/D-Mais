import { router, useLocalSearchParams } from "expo-router"

import {
	type OrderDetails,
	useOrdersList,
	useOrdersListStorage,
	useOrdersManage,
	useSellFareControl,
	useSellPaymentTermsControl,
} from "@domain"

import { useSellForm } from "@schemas"

import {
	EmptyList,
	LoadingListState,
	ScreenHeader,
	SellsForm,
	SellsProductsList,
} from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

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
	const { control } = useSellForm(order)
	const { mutate: fareControl } = useSellFareControl()
	const { mutate: manageOrder, isPending } = useOrdersManage({ onSuccess: () => router.back() })
	const { mutate: paymentTermsControl } = useSellPaymentTermsControl({})
	const title =
		order.status === "completed"
			? "Pedido Enviado"
			: order.status === "pending"
				? "Pedido Pendente"
				: "Pedido Cancelado"

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
				totalPrice={Number(order.totalPrice)}
				isPendingTotalPrice={false}
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
						disabled={isPending}
						onPress={() => manageOrder({ id: order.id, action: "remove" })}
						paddingVertical="s14"
						paddingHorizontal="s8"
					/>
					<Button
						flex={1}
						lable="Enviar venda"
						variant="primary"
						disabled={isPending}
						onPress={() => manageOrder({ id: order.id, action: "complete" })}
						paddingVertical="s14"
						paddingHorizontal="s8"
					/>
				</Box>
			)}
		</Screen>
	)
}
