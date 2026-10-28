import type { InventoryWithoutProducts } from "@domain"

import type { ProductSchema } from "@schemas"

import { Box } from "@core-components"

import { DropDownControllerInput } from "../DropDownInputs"
import { type ControllerProps, FormTextInput } from "../Form"
import { useModal } from "../Modal/useModal"

export function ProductModalBody({
	control,
	inventoryList,
	onErrorPress,
}: Pick<ControllerProps<ProductSchema>, "control"> & {
	inventoryList: InventoryWithoutProducts[] | undefined
	onErrorPress: () => void
}) {
	const { modalData } = useModal()
	const updatedInventoryList: InventoryWithoutProducts[] = modalData.updatedInventoryList
	const isLoadingInventory: boolean = modalData.isLoadingInventory
	const isErrorInventory: unknown = modalData.isErrorInventory

	return (
		<Box gap="s14" style={{ marginTop: -20 }}>
			<DropDownControllerInput
				name="inventory"
				control={control}
				textFieldStyle={{ paddingVertical: "s8" }}
				label="Estoque"
				arrowProps={{
					isError: !!isErrorInventory,
					onErrorPress,
				}}
				dropDownProps={{
					dropdownItems: inventoryList || updatedInventoryList,
					idKey: "id",
					valueKey: "description",
					showTextWithId: true,
					maxHeight: 150,
					isLoading: isLoadingInventory,
				}}
			/>

			<FormTextInput
				control={control}
				name="volume"
				keyboardType="number-pad"
				label="Litros"
				textFieldStyle={{ paddingVertical: "s8" }}
			/>
		</Box>
	)
}
