import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useCartService,
  useRepository,
} from "@infra";

import { ProductCart } from "..";

export function useCartEditVolume(options?: MutationOptions<ProductCart>) {
  const { cart } = useRepository();
  const queryClient = useQueryClient();
  const { updateProductVolume } = useCartService();

  return useAppMutation<
    ProductCart,
    { productCartId: number; newVolume: number }
  >({
    mutationFn: ({ productCartId, newVolume }) =>
      cart.editVolume(productCartId, newVolume),
    onSuccess: (prod) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cart],
      });

      updateProductVolume(prod.cartId, prod.volume);

      options?.onSuccess?.(prod);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
