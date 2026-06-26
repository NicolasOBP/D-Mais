import { useRef } from "react";
import { ListRenderItemInfo } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { Order, useOrdersList } from "@domain";
import { useAppTheme } from "@theme";

import { ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box } from "@core-components";

import { OrdersProductCard } from "./components";

export function OrderScreen() {
  const { spacing } = useAppTheme();
  const { data: orders } = useOrdersList();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<Order>) {
    return <OrdersProductCard order={item} containerProps={{ mb: "s12" }} />;
  }

  return (
    <Screen>
      <ScreenHeader title="Pedidos" />

      <Box flex={1} pt="s16">
        <Animated.FlatList
          ref={flatListRef}
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.s20 }}
          itemLayoutAnimation={LinearTransition}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: spacing.s12,
          }}
        />
      </Box>
    </Screen>
  );
}
