import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Box } from "@core-components";

import { Icon } from "../../Icon/Icon";

type Props = {
  hasSearchText: SharedValue<number>;
  onClearPress: () => void;
  iconSize?: number;
};

export function SearchIconAnimation({
  hasSearchText,
  onClearPress,
  iconSize = 21,
}: Props) {
  const searchIconStyle = useAnimatedStyle(() => ({
    position: "absolute",
    opacity: interpolate(hasSearchText.value, [0, 1], [1, 0]),
  }));

  const closeIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(hasSearchText.value, [0, 1], [0, 1]),
  }));

  return (
    <Box width={iconSize} height={iconSize}>
      <Animated.View style={searchIconStyle}>
        <Icon name="search" color="gray1" size={iconSize} />
      </Animated.View>

      <Animated.View style={closeIconStyle}>
        <Box
          borderWidth={1}
          borderRadius="rounded"
          borderColor="gray1"
          alignItems="center"
          justifyContent="center"
          p="s4"
          position="absolute"
        >
          <Icon name="close" color="gray1" size={12} onPress={onClearPress} />
        </Box>
      </Animated.View>
    </Box>
  );
}
