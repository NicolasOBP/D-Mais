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

import { CartScreenLoading } from "./components";
import { HomeScreenLoading } from "./components/HomeScreenLoading";

const SKELETON_ITEMS = 5;

type LoadingListStateProps = {
  screen: "Home" | "Cart";
};

export function LoadingListState({ screen }: LoadingListStateProps) {
  const { spacing } = useAppTheme();
  const shimmerPosition = useSharedValue(-1);

  useEffect(() => {
    shimmerPosition.value = withRepeat(
      withTiming(2, {
        duration: 1700,
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
    if (screen === "Home") {
      return <HomeScreenLoading {...shimmerStyle} />;
    }

    if (screen === "Cart") {
      return <CartScreenLoading {...shimmerStyle} />;
    }
    return <View></View>;
  }

  return (
    <Animated.FlatList
      data={Array.from({ length: SKELETON_ITEMS }, (_, i) => ({ id: i }))}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSkeletonItem!}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: screen === "Cart" ? undefined : spacing.s20,
        paddingTop: screen === "Cart" ? spacing.s16 : spacing.s24,
        paddingBottom: spacing.s14,
      }}
      itemLayoutAnimation={LinearTransition.duration(500)}
    />
  );
}
