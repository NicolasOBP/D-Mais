import {
  QueryKeys,
  useAppQuery,
  useCartItems,
  useCartService,
  useRepository,
} from "@infra";

export function useCartGetItems() {
  const { cart } = useRepository();
  const { productCartStore: cartList } = useCartItems();
  const { addProductToCart } = useCartService();

  const { data, isLoading, refetch } = useAppQuery({
    queryKey: [QueryKeys.Cart, QueryKeys.CartList],
    fetchData: cart.getCartItems,
  });

  if (cartList.length === 0 && data && !isLoading) {
    console.log({ isLoading });
    console.log({ data });

    data.forEach((item) => {
      addProductToCart(item);
    });
  }

  return {
    data: cartList,
    isLoading,
    refetch,
  };
}
