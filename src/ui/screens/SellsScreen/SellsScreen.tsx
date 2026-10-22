import { useMemo } from "react"

import { useCartStore } from "@infra"

import { useFormUtils } from "@utils"

import { ScreenHeader, SellsForm, SellsProductsList } from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

import { useSellScreen } from "./useSellScreen"

export function SellsScreen() {
	const { cartProducts } = useCartStore()
	const cartItems = useMemo(
		() => cartProducts.filter((product) => product.isSelected),
		[cartProducts],
	)

	const {
		handleShowModal,
		handleSubmit,
		handleCalculateFarePrice,
		getValues,
		setValue,
		control,
		totalPrice,
		farePrice,
		isTotalPricePending,
		formState,
		orderProducts,
	} = useSellScreen(cartItems)

	return (
		<Screen scrollable noHorizontalPadding>
			<ScreenHeader title="Pedido" goBackTo="/cart" noMargin />

			<SellsForm
				setValue={setValue}
				getValues={getValues}
				control={control}
				isTotalPricePending={isTotalPricePending}
				handleCalculateFarePrice={handleCalculateFarePrice}
			/>

			<SellsProductsList
				cartItems={orderProducts}
				totalPrice={totalPrice}
				farePrice={farePrice}
				isPendingTotalPrice={isTotalPricePending}
			/>

			<Box padding="default" paddingHorizontal="s32">
				<Button
					disabled={useFormUtils.isFormValid(formState) || isTotalPricePending}
					variant="primary"
					paddingVertical="s14"
					paddingHorizontal="s20"
					lable="Enviar pedido"
					onPress={handleSubmit(handleShowModal)}
				/>
			</Box>
		</Screen>
	)
}
