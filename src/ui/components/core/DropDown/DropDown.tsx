import { useEffect, useState } from "react";
import { Keyboard, ScrollView } from "react-native";

import Animated, { SharedValue, useSharedValue } from "react-native-reanimated";

import { StringOrNumberKeyConstraint, useDebounce } from "@utils";

import { Box, PressableBox } from "../Box";
import { Text } from "../Text";

import { useDropDownAnimation } from "./useDropDownAnimation";

export type DropDownProps<TValue> = {
  progress: SharedValue<number>;
  topOffset: number;
  onSelectItem: (value: TValue) => void;
  closeDropdown: () => void;
  dropdownItems: TValue[] | undefined;
  valueKey: StringOrNumberKeyConstraint<TValue>;
  idKey: StringOrNumberKeyConstraint<TValue>;
  searchText?: string;
};

export function DropDown<TValue>({
  progress,
  topOffset,
  onSelectItem,
  closeDropdown,
  dropdownItems,
  valueKey,
  idKey,
  searchText,
}: DropDownProps<TValue>) {
  const [items, setItems] = useState(dropdownItems);
  const searchDebounced = useDebounce(
    typeof searchText === "string" ? searchText : "",
  );
  const height = useSharedValue(0);

  const dropDownAnimation = useDropDownAnimation(progress, height);

  let diffColors = true;

  useEffect(() => {
    setItems(dropdownItems);
  }, [dropdownItems]);

  useEffect(() => {
    filterItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced]);

  function filterItems() {
    if (searchDebounced && dropdownItems) {
      setItems(
        dropdownItems.filter((item) => {
          const itemValue = String(item[valueKey]).toLowerCase();
          return itemValue.includes(searchDebounced.toLowerCase());
        }),
      );
    } else {
      setItems(dropdownItems);
    }
  }

  return (
    <Box position="absolute" top={topOffset} style={{ width: "100%" }}>
      <Animated.View style={[dropDownAnimation, { overflow: "hidden" }]}>
        <Box
          position="absolute"
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={{ width: "100%" }}
        >
          <ScrollView
            style={{ flex: 1, maxHeight: 100 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {items?.map((item) => {
              diffColors = !diffColors;
              const itemId = String(item[idKey]);
              const itemValue = String(item[valueKey]);

              return (
                <PressableBox
                  key={itemId}
                  flex={1}
                  backgroundColor={diffColors ? "gray3" : "gray4"}
                  paddingHorizontal="s8"
                  paddingVertical="s4"
                  onPress={() => {
                    onSelectItem(item);
                    closeDropdown();
                    Keyboard.dismiss();
                  }}
                >
                  <Text variant="text14">{itemValue}</Text>
                </PressableBox>
              );
            })}
          </ScrollView>
        </Box>
      </Animated.View>
    </Box>
  );
}
