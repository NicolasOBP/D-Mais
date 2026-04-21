// eslint-disable-next-line import/named
import { FieldValues } from "react-hook-form";

import { Box } from "@core-components";

import { ControllerProps, FormTextInput } from "@components";

export function ModalBody<FormType extends FieldValues>({
  control,
  name,
}: ControllerProps<FormType>) {
  return (
    <Box alignItems="center">
      <FormTextInput
        control={control}
        name={name}
        boxProps={{ width: 150 }}
        style={{ textAlign: "center" }}
        placeholder="Quantidade"
        keyboardType="number-pad"
      />
    </Box>
  );
}
