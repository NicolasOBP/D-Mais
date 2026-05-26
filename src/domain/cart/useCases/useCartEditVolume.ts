import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useRepository,
} from "@infra";

import { ProductCart } from "..";

export function useCartEditVolume(options?: MutationOptions<ProductCart>) {
  const { cart } = useRepository();
  const queryClient = useQueryClient();

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

      options?.onSuccess?.(prod);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
