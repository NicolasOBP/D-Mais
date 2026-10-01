import { router } from "expo-router"
import { useEffect } from "react"

import {
	type ProductCartScreen,
	useOrdersSend,
	useSellFareControl,
	useSellPaymentTermsControl,
} from "@domain"
import { useAuth, useBackToSellService, useCartItems } from "@infra"

import { type SellSchema, useSellForm } from "@schemas"

import { Icon, useModal } from "@components"
import { Box } from "@core-components"

import { SendSellModalBody } from "./components/SendSellModalBody"

export function useSellScreen(cartItems: ProductCartScreen[]) {
	const { authUser } = useAuth()
	const { finishSell } = useBackToSellService()
	const { showModal, closeModal, updateModalData } = useModal()

	const { totalSelectedPrice: totalPrice } = useCartItems()
	const { control, formState, handleSubmit, reset, setValue, getValues } = useSellForm()

	const { mutate: fareControl, isPending: isPendingTotalPrice } = useSellFareControl({
		onError: () => {
			setValue("freteSelecionado", !getValues("freteSelecionado"))
		},
	})
	const { mutate: paymentTermsControl, isPending: isPendingPaymentTerms } =
		useSellPaymentTermsControl({
			onSuccess: (data) => {
				setValue("tabela", data.tableName, { shouldValidate: true })
			},
		})
	const { mutate: sendOrder, isPending: isPendingOrderSend } = useOrdersSend({
		onSuccess: () => {
			finishSell()
			closeModal()
			reset()
			router.push("/orders")
		},
		onError: () => {
			closeModal()
			handleErrorShowModal()
		},
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		updateModalData({ isLoading: isPendingOrderSend })
	}, [isPendingOrderSend])

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
		sendOrder({
			products: cartItems,
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
		})
	}

	function handleErrorShowModal() {
		showModal({
			headerTitle: `Erro ao enviar venda, tente novamente entrando em "Pedidos"`,
			BodyComponent: (
				<Box alignSelf="center">
					<Icon name="errorRound" size={70} color="red" />
				</Box>
			),
			footerButton: {
				oneButtonFooter: {
					label: "Confirmar",
					onPress: () => {
						console.log("AAA")
					},
				},
			},
		})
	}

	let isTotalPricePending = isPendingTotalPrice || isPendingPaymentTerms

	return {
		handleShowModal,
		paymentTermsControl,
		handleSubmit,
		fareControl,
		cartItems,
		control,
		formState,
		isTotalPricePending,
		totalPrice,
	}
}
