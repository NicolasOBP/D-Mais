import { useRef } from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { Order, useOrdersList } from "@domain";
import { useAppTheme } from "@theme";

import { EmptyList, LoadingListState, ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box } from "@core-components";

import { OrdersProductCard } from "./components";

export function OrderScreen() {
  const { spacing } = useAppTheme();
  const { data: orders, isLoading, refetch } = useOrdersList();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<Order>) {
    return <OrdersProductCard order={item} />;
  }

  return (
    <Screen>
      <ScreenHeader title="Pedidos" />

      <Box flex={1} pt="s16">
        {isLoading ? (
          <LoadingListState screen="Orders" />
        ) : (
          <Animated.FlatList
            ref={flatListRef}
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            itemLayoutAnimation={LinearTransition.duration(500)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: spacing.s12,
              rowGap: spacing.s20,
            }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            ListEmptyComponent={<EmptyList desc="Nenhum pedido encontrado" />}
          />
        )}
      </Box>
    </Screen>
  );
}
