import type { InventoryWithoutProducts } from "@domain"

import type { ProductSchema } from "@schemas"

import { Box } from "@core-components"

import { DropDownControllerInput } from "../DropDownInputs"
import { type ControllerProps, FormTextInput } from "../Form/FormTextInput"
import { useModal } from "../Modal"

export function ProductModalBody({
	control,
	inventoryList,
}: Pick<ControllerProps<ProductSchema>, "control"> & {
	inventoryList: InventoryWithoutProducts[] | undefined
}) {
	const { modalData } = useModal()
	const updatedInventoryList: InventoryWithoutProducts[] = modalData.updatedInventoryList
	const isLoadingInventory: boolean = modalData.isLoadingInventory

	return (
		<Box gap="s14" style={{ marginTop: -20 }}>
			<DropDownControllerInput
				dropdownItems={inventoryList || updatedInventoryList}
				name="inventory"
				control={control}
				textFieldStyle={{ paddingVertical: "s8" }}
				label="Estoque"
				idKey="id"
				valueKey="description"
				showTextWithId
				maxHeight={150}
				isLoading={isLoadingInventory}
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
