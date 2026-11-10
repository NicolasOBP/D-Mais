import { useLocalSearchParams } from "expo-router"

import { useOrderDetails, useOrdersListStorage } from "@domain"

import { errorUtils } from "@utils"

import { EmptyList, LoadingListState, ScreenHeader } from "@components"
import { Screen } from "@containers"

import { EditAbleOrder } from "./components/EditableOrder"
import { NonEditableOrder } from "./components/NonEditableOrder"

export function OrderDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { data: storageOrders, isLoading: isLoadingStorage } = useOrdersListStorage()
	const storedOrder = storageOrders?.find((item) => String(item.id) === id)
	const pendingOrder = storedOrder?.status === "pending" ? storedOrder : undefined
	const {
		data: apiDetails,
		isLoading: isLoadingDetails,
		error: detailsError,
	} = useOrderDetails(id, Boolean(!pendingOrder))

	if (pendingOrder) {
		return <EditAbleOrder key={pendingOrder.id} order={pendingOrder} />
	}

	if (isLoadingStorage || isLoadingDetails) {
		return (
			<Screen>
				<LoadingListState screen="Orders" />
			</Screen>
		)
	}

	const order = apiDetails ?? storedOrder
	if (!order) {
		return (
			<Screen>
				<ScreenHeader title="Pedido" canGoBack />
				<EmptyList
					desc={
						detailsError
							? `Erro ao carregar pedido. ${errorUtils.getErrorMessage(detailsError)}`
							: "Pedido não encontrado"
					}
				/>
			</Screen>
		)
	}

	return <NonEditableOrder key={order.id} order={order} />
}
