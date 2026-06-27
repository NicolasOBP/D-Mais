import { router } from "expo-router";
import { useRef } from "react";
import { ListRenderItemInfo } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { ProductCart, useCartGetItems, useCartGetMetadata } from "@domain";
import { useAppTheme } from "@theme";

import { LoadingListState, ScreenHeader, useToast } from "@components";
import { Screen } from "@containers";
import { Box, Text } from "@core-components";

import { CartProductCard } from "./components";
import { CartFooter } from "./components/CartFooter";

type CartItem = ProductCart & { isSelected?: boolean };

export function CartScreen() {
  const { spacing } = useAppTheme();
  const { showToast } = useToast();
  const { data: cartItems, isLoading } = useCartGetItems();
  const { data: cartMetadata } = useCartGetMetadata();

  // const [cartItems, setCartItems] = useState<CartItem[] | undefined>(
  //   cart?.cartProducts,
  // );

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  const handleSelectChange = (index: number, selected: boolean) => {
    // if (cartItems) {
    //   const newItems = [...cartItems];
    //   newItems[index].isSelected = selected;
    //   setCartItems(newItems);
    // }
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

  function onCheckout() {
    if (!cartItems || cartItems.length === 0) {
      showToast({
        type: "warning",
        message: "Seu carrinho está vazio",
        duration: 4000,
      });
      return;
    }

    router.push({
      pathname: "/sell",
      params: {
        cartItems: JSON.stringify(cartItems),
        totalPrice: cartMetadata?.totalPrice || 0,
      },
    });
  }

  // useEffect(() => {
  //   setCartItems(cart?.cartProducts);
  // }, [cart]);

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
        )}
      </Box>

      <CartFooter
        onCheckout={onCheckout}
        totalItems={cartMetadata?.totalItems}
        totalPrice={cartMetadata?.totalPrice}
      />
    </Screen>
  );
}
