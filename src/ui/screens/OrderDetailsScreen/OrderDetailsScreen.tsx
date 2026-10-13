import { useLocalSearchParams } from "expo-router"

import { useOrdersList, useOrdersListStorage } from "@domain"

import { EmptyList, LoadingListState, ScreenHeader } from "@components"
import { Screen } from "@containers"

import { EditAbleOrder } from "./components/EditableOrder"
import { NonEditableOrder } from "./components/NoneditableOrder"

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

	if (order.status === "pending") {
		return <EditAbleOrder key={order.id} order={order} />
	}

	return <NonEditableOrder key={order.id} order={order} />
}
