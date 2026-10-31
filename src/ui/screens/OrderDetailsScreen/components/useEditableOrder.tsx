import { router } from "expo-router"
import { useEffect, useState } from "react"

import { useWatch } from "react-hook-form"

import {
	type OrderDetails,
	type OrderVariables,
	type PaymentMethod,
	type PaymentTerms,
	useAuthCheckLeftQuota,
	useOrderRemoveFromStorage,
	useOrderUpdateStorage,
	useOrdersSend,
	useSellCalcFinalOrder,
} from "@domain"
import { useAuth } from "@infra"

import { type SellSchema, useSellForm } from "@schemas"

import {
	OrderSendErrorModalBody,
	OrderSendErrorModalFooter,
	SendSellModalBody,
	useModal,
} from "@components"
import { Box, Text } from "@core-components"

type Props = {
	cartItems: OrderDetails["products"]
	order: OrderDetails
	defaultTotalPrice: number
}

export function useEditableOrder({ cartItems, order, defaultTotalPrice }: Props) {
	const { control, formState, handleSubmit, reset, setValue, getValues } = useSellForm(order)
	const client = useWatch({ control, name: "cliente" })
	const paymentTerms = useWatch({ control, name: "condicaoPagamento" })
	const paymentMethod = useWatch({ control, name: "formaPagamento" })
	const isFareSelected = useWatch({ control, name: "freteSelecionado" })
	const [totalPrice, setTotalPrice] = useState(defaultTotalPrice)
	const [farePrice, setFarePrice] = useState(order.farePrice)
	const [orderProducts, setOrderProducts] = useState(cartItems)
	const [lastSuccessPaymentTerms, setLastSuccessPaymentTerms] = useState<PaymentTerms>(
		getValues("condicaoPagamento"),
	)
	const [lastSuccessPaymentMethod, setLastSuccessPaymentMethod] = useState<PaymentMethod>(
		getValues("formaPagamento"),
	)
	const { authUser } = useAuth()
	const { showModal, closeModal, updateModalData } = useModal()

	const { asyncCheckLeftQuota, isPending: isPendingCheckQuota } = useAuthCheckLeftQuota()
	const { mutate: calcFinalOrderPrice, isPending: isPendingTotalPrice } = useSellCalcFinalOrder({
		onSuccess: (result) => {
			setTotalPrice(result.orderTotalPrice)
			setFarePrice(result.farePrice)
			setOrderProducts(result.orderProductItems)
			setLastSuccessPaymentTerms(paymentTerms)
			setLastSuccessPaymentMethod(paymentMethod)
		},
		onError: () => {
			setValue("formaPagamento", lastSuccessPaymentMethod)
			setValue("condicaoPagamento", lastSuccessPaymentTerms)
			setValue("tabela", lastSuccessPaymentTerms.table)
		},
	})
	const { mutate: calculateFarePrice, isPending: isPendingFarePrice } = useSellCalcFinalOrder({
		onSuccess: (result) => {
			setTotalPrice(result.orderTotalPrice)
			setFarePrice(result.farePrice)
			setOrderProducts(result.orderProductItems)
		},
		onError: () => {
			setValue("freteSelecionado", !getValues("freteSelecionado"))
		},
	})

	const { mutate: removeOrderFromStorage } = useOrderRemoveFromStorage({
		onSuccess: () => {
			closeModal()
			router.push("/orders")
		},
	})
	const { mutateAsync: sendOrder, isPending: isPendingOrderSend } = useOrdersSend({
		onSuccess: () => {
			removeOrderFromStorage({ orderId: Number(order.id) })
			closeModal()
			reset()
			router.push("/orders")
		},
	})
	const { mutate: updateOrderInStorage, isPending: isPendingOrderUpdate } = useOrderUpdateStorage({
		onSuccess: () => {
			closeModal()
			reset()
			router.push("/orders")
		},
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		updateModalData({ isLoading: isPendingOrderUpdate || isPendingOrderSend })
	}, [isPendingOrderUpdate, isPendingOrderSend])

	// biome-ignore lint/correctness/useExhaustiveDependencies: fare changes are recalculated by handleCalculateFarePrice
	useEffect(() => {
		calcFinalOrderPrice({
			client,
			isFareSelected,
			paymentTerms,
			paymentMethod,
			requestProducts: cartItems,
		})
	}, [calcFinalOrderPrice, client, paymentTerms, paymentMethod, cartItems])

	async function handleShowModal(data: SellSchema) {
		asyncCheckLeftQuota(order.products.reduce((acc, prod) => acc + prod.volume, 0))
			.then(() => {
				showModal(
					{
						BodyComponent: (
							<SendSellModalBody userLeftQuota={authUser?.leftQuota} userQuota={authUser?.quota} />
						),
						footerButton: {
							twoButtonFooter: {
								labelCancel: "Cancelar",
								labelConfirm: "Confirmar",
								onConfirm: () => onSubmit(data),
							},
						},
					},
					{ isLoading: isPendingOrderUpdate || isPendingOrderSend },
				)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	function onSubmit(data: SellSchema) {
		const orderToSend: OrderVariables = {
			products: orderProducts,
			totalPrice: totalPrice,
			client: data.cliente,
			paymentTerms: data.condicaoPagamento,
			paymentMethod: data.formaPagamento,
			company: data.transportadora,
			driver: data.motorista,
			pickup: data.carreta,
			truck: data.caminhao,
			fareSelected: data.freteSelecionado,
			farePrice,
		}

		sendOrder(orderToSend).catch((error: { message: string }) => {
			handleErrorShowModal(error.message, orderToSend)
		})
	}

	function handleErrorShowModal(errorMessage: string, orderToSend: OrderVariables) {
		showModal(
			{
				headerTitle: "Erro ao enviar pedido",
				showCloseButton: false,
				BodyComponent: <OrderSendErrorModalBody errorMessage={errorMessage} />,
				FooterComponent: (
					<OrderSendErrorModalFooter
						errorMessage={errorMessage}
						backToSell={closeModal}
						sendToPending={() => updateOrderInStorage({ ...order, ...orderToSend })}
					/>
				),
			},
			{ isLoading: isPendingOrderUpdate },
		)
	}

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
					onConfirm: () => removeOrderFromStorage({ orderId: Number(order.id) }),
				},
			},
		})
	}

	function handleCalculateFarePrice(fareSelected: boolean) {
		calculateFarePrice({
			client,
			isFareSelected: fareSelected,
			paymentTerms,
			paymentMethod,
			requestProducts: cartItems,
		})
	}

	const isTotalPricePending = isPendingTotalPrice || isPendingFarePrice

	return {
		handleShowModal,
		handleShowDeleteModal,
		handleSubmit,
		handleCalculateFarePrice,
		reset,
		getValues,
		setValue,
		control,
		formState,
		isTotalPricePending,
		isSendSellPending: isPendingCheckQuota,
		totalPrice,
		farePrice,
		orderProducts,
	}
}
