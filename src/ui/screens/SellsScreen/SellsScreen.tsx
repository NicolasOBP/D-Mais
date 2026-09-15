import { router } from "expo-router"
import { useEffect } from "react"

import { useOrdersSend } from "@domain"
import { useAuth, useBackToSellService, useCartItems, useCartService } from "@infra"

import { type SellSchema, useSellForm } from "@schemas"
import { useFormUtils } from "@utils"

import { ScreenHeader, useModal } from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

import { SellsForm } from "./components/SellsForm"
import { SellsProductsList } from "./components/SellsProductsList"
import { SendSellModalBody } from "./components/SendSellModalBody"

export function SellsScreen() {
	const { authUser } = useAuth()
	const { showModal, closeModal, updateModalData } = useModal()
	const { control, formState, handleSubmit, reset } = useSellForm()
	const { getSelectedProducts } = useCartService()
	const { totalSelectedPrice: totalPrice } = useCartItems()
	const { finishSell } = useBackToSellService()
	const { mutate: sendOrder, isPending } = useOrdersSend({
		onSuccess: () => {
			finishSell()
			closeModal()
			reset()
			router.push("/orders")
		},
	})

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
			{ isLoading: isPending },
		)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended behavior>
	useEffect(() => {
		updateModalData({ isLoading: isPending })
	}, [isPending])

	function onSubmit(data: SellSchema) {
		// TODO: fix fare field
		sendOrder({
			products: cartItems,
			totalPrice: totalPrice.toString(),
			client: data.cliente,
			paymentTerms: data.condicaoPagamento,
			company: data.transportadora,
			driver: data.motorista,
			pickup: data.carreta,
			table: data.tabela,
			truck: data.caminhao,
			fare: "10",
		})
	}

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title="Venda" goBackTo="/cart" noMargin />

			<SellsForm control={control} />

			<SellsProductsList cartItems={cartItems} totalPrice={totalPrice} />

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
