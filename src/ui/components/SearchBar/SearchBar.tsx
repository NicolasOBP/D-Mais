import { useSharedValue, withTiming } from "react-native-reanimated";

import { Box, BoxProps, TextInput } from "@core-components";

import { SearchIconAnimation } from "./components/SearchIconAnimation";

export interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  searchText: string;
  containerProps?: BoxProps;
}

export function SearchBar({
  placeholder = "Buscar",
  onChangeText,
  containerProps,
  searchText,
}: SearchBarProps) {
  const hasSearchTextValue = useSharedValue(searchText ? 1 : 0);

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

  function handleChangeText(text: string) {
    hasSearchTextValue.value = withTiming(text ? 1 : 0, {
      duration: 300,
    });
    onChangeText(text);
  }

  function clearSearchText() {
    onChangeText("");
    hasSearchTextValue.value = withTiming(0, {
      duration: 300,
    });
  }

  return (
    <Box {...searchStyle} {...containerProps}>
      <TextInput
        onChangeText={handleChangeText}
        value={searchText}
        placeholder={placeholder}
        RighComponent={
          <SearchIconAnimation
            hasSearchText={hasSearchTextValue}
            onClearPress={clearSearchText}
          />
        }
      />
    </Box>
  );
}
