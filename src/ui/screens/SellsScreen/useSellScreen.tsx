import { router } from "expo-router"
import { useEffect } from "react"

import { useWatch } from "react-hook-form"

import {
	type ProductCartScreen,
	useOrderSaveStorage,
	useOrdersSend,
	useSellFareControl,
	useSellPaymentTermsControl,
} from "@domain"
import {
	disableBackgroundOrderSaving,
	enableBackgroundOrderSaving,
	setBackgroundOrderDraft,
	useAuth,
	useBackToSellService,
	useCartStore,
	useOrderService,
	useOrderStore,
} from "@infra"

import { type SellSchema, useSellForm } from "@schemas"

import { Icon, SendSellModalBody, useModal } from "@components"
import { Box } from "@core-components"

type Props = {
	cartItems: ProductCartScreen[]
}

export function useSellScreen({ cartItems }: Props) {
	const { authUser } = useAuth()
	const { finishSell } = useBackToSellService()
	const { setProductsTotal, setOrderDetails, clearOrder, updateOrderTotalPrice } = useOrderService()
	const { showModal, closeModal, updateModalData } = useModal()

	const { totalSelectedPrice: productsTotal } = useCartStore()
	const { totalPrice } = useOrderStore()

	const { control, formState, handleSubmit, reset, setValue, getValues } = useSellForm()
	const watchedSellFormValues = useWatch({ control })

	const { mutate: saveOrderInStorage } = useOrderSaveStorage({
		onSuccess: () => {
			disableBackgroundOrderSaving()
			finishSell()

			closeModal()
			handleErrorShowModal()
		},
	})
	const { mutate: fareControl, isPending: isPendingTotalPrice } = useSellFareControl({
		onSuccess: (price) => {
			updateOrderTotalPrice(price)
		},
		onError: () => {
			setValue("freteSelecionado", !getValues("freteSelecionado"))
		},
	})
	const { mutate: paymentTermsControl, isPending: isPendingPaymentTerms } =
		useSellPaymentTermsControl({
			onSuccess: (data) => {
				updateOrderTotalPrice(data.price)
				setValue("tabela", data.tableName, { shouldValidate: true })
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		updateModalData({ isLoading: isPendingOrderSend })
	}, [isPendingOrderSend])

	useEffect(() => {
		setProductsTotal(productsTotal)
	}, [productsTotal, setProductsTotal])

	useEffect(() => {
		enableBackgroundOrderSaving()
	}, [])

	useEffect(() => {
		const sellFormValues = getValues()
		setBackgroundOrderDraft({
			products: cartItems,
			totalPrice,
			client: sellFormValues.cliente,
			paymentTerms: sellFormValues.condicaoPagamento,
			paymentMethod: sellFormValues.formaPagamento,
			company: sellFormValues.transportadora,
			driver: sellFormValues.motorista,
			pickup: sellFormValues.carreta,
			table: sellFormValues.tabela,
			truck: sellFormValues.caminhao,
			fareSelected: sellFormValues.freteSelecionado,
		})
	}, [cartItems, getValues, totalPrice])

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
		}

		setOrderDetails(order)
		sendOrder(order)
	}

	function handleErrorShowModal() {
		showModal({
			headerTitle: `Erro ao enviar venda, tente novamente entrando em "Pedidos"`,
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

	let isTotalPricePending = isPendingTotalPrice || isPendingPaymentTerms

	return {
		handleShowModal,
		paymentTermsControl,
		handleSubmit,
		fareControl,
		control,
		formState,
		isTotalPricePending,
		totalPrice: totalPrice,
	}
}
