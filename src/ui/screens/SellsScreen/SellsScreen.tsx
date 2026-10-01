import { router } from "expo-router"
import { useEffect } from "react"

import { useOrdersSend, useSellFareControl, useSellPaymentTermsControl } from "@domain"
import { useAuth, useBackToSellService, useCartItems, useCartService } from "@infra"

import { type SellSchema, useSellForm } from "@schemas"
import { useFormUtils } from "@utils"

import { ScreenHeader, SellsForm, SellsProductsList, useModal } from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

import { SendSellModalBody } from "./components/SendSellModalBody"

export function SellsScreen() {
	const { authUser } = useAuth()
	const { showModal, closeModal, updateModalData } = useModal()
	const { control, formState, handleSubmit, reset, setValue, getValues } = useSellForm()
	const { getSelectedProducts } = useCartService()
	const { totalSelectedPrice: totalPrice } = useCartItems()
	const { finishSell } = useBackToSellService()
	const { mutate: sendOrder, isPending: isPendingOrderSend } = useOrdersSend({
		onSuccess: () => {
			finishSell()
			closeModal()
			reset()
			router.push("/orders")
		},
	})
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

	let isTotalPricePending = isPendingTotalPrice || isPendingPaymentTerms

	const cartItems = getSelectedProducts()

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		updateModalData({ isLoading: isPendingOrderSend })
	}, [isPendingOrderSend])

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

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title="Venda" goBackTo="/cart" noMargin />

			<SellsForm
				control={control}
				fareControl={fareControl}
				paymentTermsControl={paymentTermsControl}
			/>

			<SellsProductsList
				cartItems={cartItems}
				totalPrice={totalPrice}
				isPendingTotalPrice={isTotalPricePending}
			/>

			<Box padding="default" paddingHorizontal="s32">
				<Button
					disabled={useFormUtils.isFormValid(formState)}
					variant="primary"
					paddingVertical="s14"
					paddingHorizontal="s20"
					lable="Enviar venda"
					onPress={handleSubmit(handleShowModal)}
				/>
			</Box>
		</Screen>
	)
}
