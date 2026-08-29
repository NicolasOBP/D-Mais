import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useCartService,
  useRepository,
} from "@infra";

import { ProductCart } from "..";
import { Inventory } from "../../inventory";

export function useCartEditProduct(options?: MutationOptions<ProductCart>) {
  const { cart } = useRepository();
  const queryClient = useQueryClient();
  const { updateCartProduct } = useCartService();

  return useAppMutation<
    ProductCart,
    { productCartId: number; newVolume: number; newInventory: Inventory }
  >({
    mutationFn: ({ productCartId, newVolume, newInventory }) =>
      cart.editCartProduct(productCartId, newVolume, newInventory),
    onSuccess: (prod) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cart],
      });

      updateCartProduct(prod.cartId, prod.volume, prod.inventory);

      options?.onSuccess?.(prod);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
