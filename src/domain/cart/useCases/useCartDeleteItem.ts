import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useRepository,
} from "@infra";

import { useToast } from "@components";

import { ProductCart } from "..";

export function useCartDeleteItem(options?: MutationOptions<void>) {
  const { cart } = useRepository();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<void, { productCartId: ProductCart["cartId"] }>({
    mutationFn: (prod) => cart.deleteItem(prod.productCartId),
    onSuccess: (prod) => {
      showToast({
        type: "success",
        message: "Produto deletado!",
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cart],
      });

      options?.onSuccess?.(prod);
    },
    onError: (error) => {
      showToast({
        type: "error",
        message: error.message,
      });
    },
  });
}
