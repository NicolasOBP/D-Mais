import { router } from "expo-router";
import { useRef } from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { ProductCartScreen, useCartGetItems } from "@domain";
import { useCartItems, useCartService } from "@infra";
import { useAppTheme } from "@theme";

import {
  EmptyList,
  LoadingListState,
  ScreenHeader,
  useToast,
} from "@components";
import { Screen } from "@containers";
import { Box } from "@core-components";

import { CartProductCard } from "./components";
import { CartFooter } from "./components/CartFooter";

export function CartScreen() {
  const { spacing } = useAppTheme();
  const { showToast } = useToast();
  const { data: cartItems, isLoading, refetch } = useCartGetItems();
  const { selectedItems, totalSelectedPrice } = useCartItems();
  const { toggleProductSelection, getSelectedProducts } = useCartService();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function handleSelectChange(productCartId: number) {
    toggleProductSelection(productCartId);
  }

  function renderItem({ item }: ListRenderItemInfo<ProductCartScreen>) {
    return (
      <CartProductCard
        product={item}
        onSelectChange={() => handleSelectChange(item.cartId)}
      />
    );
  }

  function onCheckout() {
    if (getSelectedProducts().length === 0) {
      showToast({
        type: "warning",
        message: "Seu carrinho está vazio",
        duration: 4000,
      });
      return;
    }

    router.push("/sell");
  }

  return (
    <Screen noHorizontalPadding paddingBottom={spacing.s8}>
      <ScreenHeader title="Carrinho" />

      <Box flex={1} paddingHorizontal="default">
        {isLoading ? (
          <LoadingListState screen="Cart" />
        ) : (
          <Animated.FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartId.toString()}
            contentContainerStyle={{ paddingTop: spacing.s16 }}
            renderItem={renderItem}
            itemLayoutAnimation={LinearTransition.duration(500)}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            ListEmptyComponent={<EmptyList desc="Seu carrinho está vazio" />}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
          />
        )}
      </Box>

      <CartFooter
        onCheckout={onCheckout}
        totalItems={selectedItems}
        totalPrice={totalSelectedPrice}
      />
    </Screen>
  );
}
