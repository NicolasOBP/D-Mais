import { useCartService } from "@infra"

import { useFormUtils } from "@utils"

import { ScreenHeader, SellsForm, SellsProductsList } from "@components"
import { Screen } from "@containers"
import { Box, Button } from "@core-components"

import { useSellScreen } from "./useSellScreen"

export function SellsScreen() {
	const { getSelectedProducts } = useCartService()
	const cartItems = getSelectedProducts()
	const {
		handleShowModal,
		handleSubmit,
		fareControl,
		paymentTermsControl,
		control,
		totalPrice,
		isTotalPricePending,
		formState,
	} = useSellScreen(cartItems)

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
					disabled={useFormUtils.isFormValid(formState) || isTotalPricePending}
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
