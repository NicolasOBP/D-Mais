import { Pressable, ScrollView } from "react-native";

import Animated, { SharedValue, useSharedValue } from "react-native-reanimated";

import { Box } from "../Box";
import { Text } from "../Text";

import { useDropDownAnimation } from "./useDropDownAnimation";

type DropDownProps<TValue extends { value: string }> = {
  progress: SharedValue<number>;
  topOffset: number;
  onSelectItem: (value: string) => void;
  setSelectedValue: (value: string) => void;
  closeDropdown: () => void;
  items: TValue[];
};

export function DropDown<TValue extends { value: string }>({
  progress,
  topOffset,
  onSelectItem,
  setSelectedValue,
  closeDropdown,
  items,
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
            {items.map((item) => {
              diffColors = !diffColors;

              return (
                <Box
                  key={item.value}
                  flex={1}
                  bg={diffColors ? "gray3" : "gray4"}
                  paddingHorizontal="s8"
                  paddingVertical="s4"
                >
                  <Pressable
                    onPress={() => {
                      onSelectItem(item.value);
                      setSelectedValue(item.value);
                      closeDropdown();
                    }}
                  >
                    <Text variant="text14">{item.value}</Text>
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
