import type { Inventory } from "@domain"

import type { ProductSchema } from "@schemas"

import { Box } from "@core-components"

import { DropDownTextInput } from "../DropDownTextInput"
import { type ControllerProps, FormTextInput } from "../Form/FormTextInput"

export function ProductModalBody({
	control,
	inventoryList,
}: Pick<ControllerProps<ProductSchema>, "control"> & {
	inventoryList: Inventory[] | undefined
}) {
	return (
		<Box gap="s14" style={{ marginTop: -20 }}>
			<DropDownTextInput
				dropdownItems={inventoryList}
				name="inventory"
				control={control}
				textFieldStyle={{ paddingVertical: "s8" }}
				label="Estoque"
				idKey="id"
				valueKey="description"
				showTextWithId
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
