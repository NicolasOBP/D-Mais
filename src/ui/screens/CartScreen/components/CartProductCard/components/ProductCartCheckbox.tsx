import { Pressable } from "react-native";

import { Icon } from "@components";
import { Box, BoxProps } from "@core-components";

type Props = {
  handleSelectChange: () => void;
  selected: boolean;
};

export function ProductCartCheckbox({ handleSelectChange, selected }: Props) {
  return (
    <Pressable onPress={handleSelectChange}>
      <Box
        {...containerBoxStyle}
        borderColor={selected ? "primary" : "gray2"}
        backgroundColor={selected ? "primary" : "background"}
      >
        {selected && <Icon name="check" color="background" />}
      </Box>
    </Pressable>
  );
}

const containerBoxStyle: BoxProps = {
  width: 24,
  height: 24,
  borderRadius: "checkbox",
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
};
