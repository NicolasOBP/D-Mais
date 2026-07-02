import { useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import Animated, {
  AnimatedStyle,
  Easing,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

import theme from "../../theme/theme";

import {
  CartScreenLoading,
  HomeScreenLoading,
  OrderScreenLoading,
} from "./components";

const SKELETON_ITEMS = 5;

type LoadingListStateProps = {
  screen: "Home" | "Cart" | "Orders";
};

export function LoadingListState({ screen }: LoadingListStateProps) {
  const { spacing } = useAppTheme();
  const shimmerPosition = useSharedValue(-1);

  useEffect(() => {
    shimmerPosition.value = withRepeat(
      withTiming(2, {
        duration: 1300,
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

    if (screen === "Orders") {
      return <OrderScreenLoading {...shimmerStyle} />;
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
      contentContainerStyle={screenListStyleMap[screen].container}
      columnWrapperStyle={screenListStyleMap[screen].wrapper}
      itemLayoutAnimation={LinearTransition.duration(500)}
      numColumns={screen === "Orders" ? 2 : 1}
    />
  );
}

const screenListStyleMap: Record<
  LoadingListStateProps["screen"],
  {
    container: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
    wrapper?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  }
> = {
  Cart: {
    container: {
      paddingTop: theme.spacing.s16,
      paddingBottom: theme.spacing.s14,
    },
  },
  Home: {
    container: {
      gap: theme.spacing.s20,
      paddingTop: theme.spacing.s24,
      paddingBottom: theme.spacing.s14,
    },
  },
  Orders: {
    container: {
      paddingBottom: theme.spacing.s12,
      rowGap: theme.spacing.s20,
    },
    wrapper: {
      gap: theme.spacing.s24,
    },
  },
};
