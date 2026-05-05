import { Pressable } from "react-native";

import { Icon } from "@components";
import { Box } from "@core-components";

type Props = {
  handleSelectChange: () => void;
  selected: boolean;
};

export function ProductCartCheckbox({ handleSelectChange, selected }: Props) {
  return (
    <Pressable onPress={handleSelectChange}>
      <Box
        width={24}
        height={24}
        borderRadius="checkbox"
        borderWidth={1}
        borderColor={selected ? "primary" : "gray2"}
        backgroundColor={selected ? "primary" : "background"}
        justifyContent="center"
        alignItems="center"
      >
        {selected && <Icon name="check" color="background" />}
      </Box>
    </Pressable>
  );
}
