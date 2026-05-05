import { useEffect, useRef, useState } from "react";
import { ListRenderItemInfo } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { ProductCart, useCartGetAll } from "@domain";
import { useAppTheme } from "@theme";

import { ScreenHeader } from "@components";
import { Screen } from "@containers";
import { Box, Button, Text } from "@core-components";

import { CartProductCard } from "./components";

type CartItem = ProductCart & { isSelected?: boolean };

export function CartScreen() {
  const { spacing } = useAppTheme();
  const { cart } = useCartGetAll();

  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(
    cart?.cartProducts,
  );

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  const handleSelectChange = (index: number, selected: boolean) => {
    if (cartItems) {
      const newItems = [...cartItems];
      newItems[index].isSelected = selected;
      setCartItems(newItems);
    }
  };

  function renderItem({ item, index }: ListRenderItemInfo<CartItem>) {
    return (
      <CartProductCard
        product={item}
        isSelected={item.isSelected}
        onSelectChange={(selected) => handleSelectChange(index, selected)}
      />
    );
  }

  useEffect(() => {
    setCartItems(cart?.cartProducts);
  }, [cart]);

  if (!cart) {
    return null;
  }

  return (
    <Screen>
      <ScreenHeader title="Carrinho" />

      <Animated.FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: spacing.s24,
        }}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition.duration(500)}
        ref={flatListRef}
        ListEmptyComponent={
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            paddingVertical="s56"
          >
            <Text variant="title16">Seu carrinho está vazio</Text>
          </Box>
        }
      />

      {/* Footer with Total and Checkout */}
      {cart.totalItems > 0 && (
        <Box
          paddingHorizontal="s16"
          paddingVertical="s16"
          borderTopWidth={1}
          borderTopColor="gray2"
          backgroundColor="background"
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="s16"
          >
            <Text variant="text12">Total do carrinho:</Text>
            <Text variant="title16">{cart?.totalPrice}</Text>
          </Box>

          <Button
            lable="Finalizar Compra"
            variant="primary"
            onPress={() => {
              // TODO: Handle checkout
            }}
          />
        </Box>
      )}
    </Screen>
  );
}
