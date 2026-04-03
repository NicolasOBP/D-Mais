import { Box, BoxProps, TextInput } from "@core-components";

import { Icon } from "../Icon";

export interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  searchText: string;
  containerProps?: BoxProps;
}

export function SearchBar({
  placeholder = "Buscar",
  onChangeText,
  containerProps,
  searchText,
}: SearchBarProps) {
  const searchStyle: BoxProps = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "s16",
    paddingVertical: "s12",
    borderRadius: "inputField",
    backgroundColor: "background",
    borderWidth: 1,
    borderColor: "gray4",
    gap: "s12",
  };

  return (
    <Box {...searchStyle} {...containerProps}>
      <TextInput
        onChangeText={onChangeText}
        value={searchText}
        placeholder={placeholder}
        LeftComponent={<Icon name="search" color="gray1" />}
      />
    </Box>
  );
}
