import { ProductSchema } from "@schemas";

import { Box } from "@core-components";

import { DropDownTextInput } from "../DropDownTextInput";
import { ControllerProps, FormTextInput } from "../Form/FormTextInput";

export function ProductModalBody({
  control,
}: Pick<ControllerProps<ProductSchema>, "control">) {
  return (
    <Box gap="s14" style={{ marginTop: -20 }}>
      <DropDownTextInput
        dropdownItems={["inventory1", "inventory2"]}
        name="inventory"
        control={control}
        textFieldStyle={{ paddingVertical: "s8" }}
        label="Estoque"
      />

      <FormTextInput
        control={control}
        name="volume"
        keyboardType="number-pad"
        label="Litros"
        textFieldStyle={{ paddingVertical: "s8" }}
      />
    </Box>
  );
}
