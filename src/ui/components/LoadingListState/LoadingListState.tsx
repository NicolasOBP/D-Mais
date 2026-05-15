import { useEffect } from "react";
import { View } from "react-native";

import Animated, {
  Easing,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

const SKELETON_ITEMS = 5;

export function LoadingListState() {
  const { spacing, colors, borderRadii } = useAppTheme();
  const shimmerPosition = useSharedValue(-1);

  useEffect(() => {
    shimmerPosition.value = withRepeat(
      withTiming(2, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
    );
  }, [shimmerPosition]);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shimmerPosition.value * 400 - 200,
        },
      ],
    };
  });

  function renderSkeletonItem() {
    return (
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: borderRadii.default,
          borderWidth: 1,
          borderColor: colors.primary,
          padding: spacing.s10,
          gap: spacing.s16,
        }}
      >
        {/* Shimmer gradient overlay */}
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 100,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              zIndex: 10,
            },
            shimmerStyle,
          ]}
        />

        {/* Title skeleton */}
        <View
          style={{
            height: 16,
            backgroundColor: colors.gray4,
            borderRadius: 8,
            marginTop: spacing.s8,
            width: "70%",
            zIndex: 1,
          }}
        />

        {/* Price skeleton */}
        <View
          style={{
            height: 14,
            backgroundColor: colors.gray4,
            borderRadius: 8,
            width: "50%",
          }}
        />

        {/* Button skeleton */}
        <View
          style={{
            height: 40,
            backgroundColor: colors.gray4,
            borderRadius: borderRadii.default,
            marginHorizontal: spacing.s32,
            marginTop: spacing.s10,
          }}
        />
      </View>
    );
  }

  return (
    <Animated.FlatList
      data={Array.from({ length: SKELETON_ITEMS }, (_, i) => ({ id: i }))}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSkeletonItem}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: spacing.s20,
        paddingTop: spacing.s24,
        paddingBottom: spacing.s14,
      }}
      itemLayoutAnimation={LinearTransition.duration(500)}
    />
  );
}
