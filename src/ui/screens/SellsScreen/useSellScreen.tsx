import { router } from "expo-router"
import { useCallback, useEffect, useState } from "react"

import { useFocusEffect } from "@react-navigation/native"
import { useWatch } from "react-hook-form"

import {
	type PaymentMethod,
	type PaymentTerms,
	type ProductCartScreen,
	useOrderSaveStorage,
	useOrdersSend,
	useSellCalcFinalOrder,
} from "@domain"
import {
	useAuth,
	useBackToSellService,
	useBackgroundOrderService,
	useOrderService,
	useOrderStore,
} from "@infra"

import { type SellSchema, useSellForm } from "@schemas"

import { Icon, SendSellModalBody, useModal } from "@components"
import { Box } from "@core-components"

export function useSellScreen(orderItems: ProductCartScreen[]) {
	const { showModal, closeModal, updateModalData } = useModal()
	const { authUser } = useAuth()
	const { finishSell } = useBackToSellService()

	const { updateOrderFormDataDetails, clearOrder, updateProductsPrice } = useOrderService()
	const { totalPrice, farePrice, products: orderProducts } = useOrderStore()
	const { disableBackgroundOrderSaving, enableBackgroundOrderSaving } = useBackgroundOrderService()

	const { control, formState, handleSubmit, reset, setValue, getValues } = useSellForm()
	const client = useWatch({ control, name: "cliente" })
	const paymentTerms = useWatch({ control, name: "condicaoPagamento" })
	const paymentMethod = useWatch({ control, name: "formaPagamento" })
	const company = useWatch({ control, name: "transportadora" })
	const driver = useWatch({ control, name: "motorista" })
	const pickup = useWatch({ control, name: "carreta" })
	const truck = useWatch({ control, name: "caminhao" })
	const isFareSelected = useWatch({ control, name: "freteSelecionado" })
	const [lastSuccessPaymentTerms, setLastSuccessPaymentTerms] = useState<PaymentTerms>(
		getValues("condicaoPagamento"),
	)
	const [lastSuccessPaymentMethod, setLastSuccessPaymentMethod] = useState<PaymentMethod>(
		getValues("formaPagamento"),
	)

	const { mutate: calcFinalOrderPrice, isPending: isPendingTotalFinalPrice } =
		useSellCalcFinalOrder({
			onSuccess: (orderResult) => {
				updateProductsPrice(orderResult)
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
		onSuccess: (orderResult) => {
			updateProductsPrice(orderResult)
		},
		onError: () => {
			setValue("freteSelecionado", !getValues("freteSelecionado"))
		},
	})

	const { mutate: saveOrderInStorage } = useOrderSaveStorage({
		onSuccess: () => {
			disableBackgroundOrderSaving()
			finishSell()

			closeModal()
			handleErrorShowModal()
		},
	})

	const { mutate: sendOrder, isPending: isPendingOrderSend } = useOrdersSend({
		onSuccess: () => {
			disableBackgroundOrderSaving()
			finishSell()
			clearOrder()
			closeModal()
			reset()
			router.push("/orders")
		},
		onError: () => {
			saveOrderInStorage()
		},
	})

	useEffect(() => {
		updateModalData({ isLoading: isPendingOrderSend })
	}, [isPendingOrderSend, updateModalData])

	useFocusEffect(
		useCallback(() => {
			enableBackgroundOrderSaving()
		}, [enableBackgroundOrderSaving]),
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <just call when really intended>
	useEffect(() => {
		calcFinalOrderPrice({
			client: client,
			isFareSelected: isFareSelected,
			paymentTerms: paymentTerms,
			paymentMethod: paymentMethod,
			requestProducts: orderItems,
		})
	}, [orderItems, calcFinalOrderPrice, client.rg, paymentTerms.id, paymentMethod.id])

	useEffect(() => {
		updateOrderFormDataDetails({
			client: client,
			paymentTerms: paymentTerms,
			paymentMethod: paymentMethod,
			company: company,
			driver: driver,
			pickup: pickup,
			truck: truck,
			fareSelected: isFareSelected,
		})
	}, [
		client,
		paymentTerms,
		paymentMethod,
		company,
		driver,
		pickup,
		truck,
		isFareSelected,
		updateOrderFormDataDetails,
	])

	function handleShowModal(data: SellSchema) {
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
			{ isLoading: isPendingOrderSend },
		)
	}

	function onSubmit(data: SellSchema) {
		const order = {
			products: orderItems,
			totalPrice: totalPrice,
			client: data.cliente,
			paymentTerms: data.condicaoPagamento,
			paymentMethod: data.formaPagamento,
			company: data.transportadora,
			driver: data.motorista,
			pickup: data.carreta,
			table: data.tabela,
			truck: data.caminhao,
			fareSelected: data.freteSelecionado,
			farePrice: farePrice,
		}

		sendOrder(order)
	}

	function handleErrorShowModal() {
		showModal({
			headerTitle: `Erro ao enviar pedido, tente novamente entrando em "Pedidos"`,
			showCloseButton: false,
			BodyComponent: (
				<Box alignSelf="center">
					<Icon name="errorRound" size={70} color="red" />
				</Box>
			),
			footerButton: {
				oneButtonFooter: {
					label: "Confirmar",
					onPress: () => {
						reset()
						clearOrder()

						closeModal()
						router.push("/orders")
					},
				},
			},
		})
	}

	function handleCalculateFarePrice(fareSelected: boolean) {
		calculateFarePrice({
			client: client,
			isFareSelected: fareSelected,
			paymentTerms: paymentTerms,
			paymentMethod: paymentMethod,
			requestProducts: orderItems,
		})
	}

	let isTotalPricePending = isPendingTotalFinalPrice || isPendingFarePrice

	return {
		handleShowModal,
		handleSubmit,
		handleCalculateFarePrice,
		getValues,
		setValue,
		control,
		formState,
		isTotalPricePending,
		totalPrice,
		farePrice,
		orderProducts,
	}
}
