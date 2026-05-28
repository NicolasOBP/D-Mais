import { Keyboard, Pressable, ScrollView } from "react-native";

import Animated, { SharedValue, useSharedValue } from "react-native-reanimated";

import { StringOrNumberKeyConstraint } from "@utils";

import { Box } from "../Box";
import { Text } from "../Text";

import { useDropDownAnimation } from "./useDropDownAnimation";

export type DropDownProps<TValue extends any[]> = {
  progress: SharedValue<number>;
  topOffset: number;
  onSelectItem: (value: TValue[number]) => void;
  closeDropdown: () => void;
  dropdownItems: TValue | undefined;
  valueKey: StringOrNumberKeyConstraint<TValue[number]>;
  idKey: StringOrNumberKeyConstraint<TValue[number]>;
};

export function DropDown<TValue extends any[]>({
  progress,
  topOffset,
  onSelectItem,
  closeDropdown,
  dropdownItems,
  valueKey,
  idKey,
}: DropDownProps<TValue>) {
  const height = useSharedValue(0);

  const dropDownAnimation = useDropDownAnimation(progress, height);

  let diffColors = true;

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
            {dropdownItems?.map((item) => {
              diffColors = !diffColors;
              const itemId = String(item[idKey]);
              const itemValue = String(item[valueKey]);

              return (
                <Box
                  key={itemId}
                  flex={1}
                  bg={diffColors ? "gray3" : "gray4"}
                  paddingHorizontal="s8"
                  paddingVertical="s4"
                >
                  <Pressable
                    onPress={() => {
                      onSelectItem(item);
                      closeDropdown();
                      Keyboard.dismiss();
                    }}
                  >
                    <Text variant="text14">{itemValue}</Text>
                  </Pressable>
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      </Animated.View>
    </Box>
  );
}
