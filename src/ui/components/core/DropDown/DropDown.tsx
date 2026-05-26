import { Pressable, ScrollView } from "react-native";

import Animated, { SharedValue, useSharedValue } from "react-native-reanimated";

import { Box } from "../Box";
import { Text } from "../Text";

import { useDropDownAnimation } from "./useDropDownAnimation";

type DropDownProps<TValue extends { value: string; id: string }> = {
  progress: SharedValue<number>;
  topOffset: number;
  onSelectItem: (value: TValue) => void;
  setSelectedValue: React.Dispatch<React.SetStateAction<TValue | undefined>>;
  closeDropdown: () => void;
  items: TValue[];
};

export function DropDown<TValue extends { value: string; id: string }>({
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
                  key={item.id}
                  flex={1}
                  bg={diffColors ? "gray3" : "gray4"}
                  paddingHorizontal="s8"
                  paddingVertical="s4"
                >
                  <Pressable
                    onPress={() => {
                      onSelectItem(item);
                      setSelectedValue(item);
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
