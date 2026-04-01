import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Box } from "@core-components";

import { Icon } from "../../Icon/Icon";

type Props = {
  toggleIsSecure: () => void;
  opacityValue: SharedValue<number>;
  iconSize?: number;
};

export function EyeIcon({
  toggleIsSecure,
  opacityValue,
  iconSize = 23,
}: Props) {
  const eyeOffStyle = useAnimatedStyle(() => ({
    paddingRight: 20,
    position: "absolute",
    opacity: interpolate(opacityValue.value, [0, 1], [0, 1]),
  }));

  const eyeOnStyle = useAnimatedStyle(() => ({
    paddingRight: 20,
    position: "absolute",
    opacity: interpolate(opacityValue.value, [0, 1], [1, 0]),
  }));

  return (
    <Box width={iconSize} height={iconSize}>
      <Animated.View style={eyeOffStyle}>
        <Icon
          onPress={toggleIsSecure}
          name="eyeOff"
          color="gray2"
          size={iconSize}
        />
      </Animated.View>

      <Animated.View style={eyeOnStyle}>
        <Icon
          onPress={toggleIsSecure}
          name="eyeOn"
          color="gray2"
          size={iconSize}
        />
      </Animated.View>
    </Box>
  );
}
