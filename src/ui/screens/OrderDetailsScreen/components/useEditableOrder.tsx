import { router } from "expo-router"
import { useEffect, useState } from "react"

import {
	type OrderDetails,
	type OrderVariables,
	useAuthCheckLeftQuota,
	useOrderRemoveFromStorage,
	useOrderUpdateStorage,
	useOrdersSend,
	useSellFareControl,
	useSellPaymentTermsControl,
} from "@domain"
import { useAuth } from "@infra"

import { type SellSchema, useSellForm } from "@schemas"

import { Icon, SendSellModalBody, useModal } from "@components"
import { Box, Text } from "@core-components"

type Props = {
	cartItems: OrderDetails["products"]
	order: OrderDetails
	defaultTotalPrice: number
}

export function useEditableOrder({ cartItems, order, defaultTotalPrice }: Props) {
	const [totalPrice, setTotalPrice] = useState(defaultTotalPrice)
	const { authUser } = useAuth()
	const { showModal, closeModal, updateModalData } = useModal()

	const { control, formState, handleSubmit, reset, setValue, getValues } = useSellForm(order)

	const { checkLeftQuota, isPending: isPendingCheckQuota } = useAuthCheckLeftQuota()
	const { mutate: fareControl, isPending: isPendingTotalPrice } = useSellFareControl({
		onSuccess: (price) => {
			setTotalPrice((prevPrice) => prevPrice + price)
		},
		onError: () => {
			setValue("freteSelecionado", !getValues("freteSelecionado"))
		},
	})
	const { mutate: paymentTermsControl, isPending: isPendingPaymentTerms } =
		useSellPaymentTermsControl({
			onSuccess: (data) => {
				setTotalPrice((prevPrice) => prevPrice + data.price)
				setValue("tabela", data.tableName, { shouldValidate: true })
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
			removeOrderFromStorage({ orderId: order.id })
			closeModal()
			reset()
			router.push("/orders")
		},
		onError: () => {
			closeModal()
			handleErrorShowModal()
		},
	})
	const { mutate: updateOrderInStorage, isPending: isPendingOrderUpdate } = useOrderUpdateStorage()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		updateModalData({ isLoading: isPendingOrderUpdate || isPendingOrderSend })
	}, [isPendingOrderUpdate, isPendingOrderSend])

	async function handleShowModal(data: SellSchema) {
		checkLeftQuota(order.products.reduce((acc, prod) => acc + prod.volume, 0))
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

		sendOrder(orderToSend).catch(() => {
			updateOrderInStorage({ ...order, ...orderToSend })
		})
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

						closeModal()
						router.push("/orders")
					},
				},
			},
		})
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
					onConfirm: () => removeOrderFromStorage({ orderId: order.id }),
				},
			},
		})
	}

	let isTotalPricePending = isPendingTotalPrice || isPendingPaymentTerms

	return {
		handleShowModal,
		handleShowDeleteModal,
		paymentTermsControl,
		handleSubmit,
		fareControl,
		reset,
		control,
		formState,
		isTotalPricePending,
		isSendSellPending: isPendingCheckQuota,
		totalPrice: totalPrice,
	}
}
