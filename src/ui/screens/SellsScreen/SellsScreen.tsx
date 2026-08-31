import { router } from "expo-router"
import { useEffect } from "react"
import { FlatList, ScrollView } from "react-native"

import { useOrdersSend } from "@domain"
import { useAuth, useBackToSellService, useCartItems, useCartService } from "@infra"

import { type SellSchema, useSellForm } from "@schemas"
import { useAppTheme } from "@theme"
import { useFormUtils } from "@utils"

import { ScreenHeader, useModal } from "@components"
import { Screen } from "@containers"
import { Box, Button, Text } from "@core-components"

import { SellsForm } from "./components/SellsForm"
import { SellsProductCard } from "./components/SellsProductCard"
import { SendSellModalBody } from "./components/SendSellModalBody"

export function SellsScreen() {
	const { authUser } = useAuth()
	const { spacing } = useAppTheme()
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
			fare: data.valorFrete,
		})
	}

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title="Venda" goBackTo="/cart" noMargin />

			<SellsForm control={control} />

			<Box pb="s8">
				<Text variant="title12" mb="s12" paddingHorizontal="default">
					Produtos
				</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					directionalLockEnabled={true}
					alwaysBounceVertical={false}
				>
					<FlatList
						key={cartItems.length}
						data={cartItems}
						renderItem={({ item }) => <SellsProductCard key={item.cartId} item={item} />}
						keyExtractor={(item) => item.cartId.toString()}
						numColumns={Math.ceil(cartItems.length / 2)}
						contentContainerStyle={{
							gap: spacing.s12,
						}}
						style={{ paddingLeft: spacing.default, paddingRight: spacing.s8 }}
					/>
				</ScrollView>
			</Box>

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
