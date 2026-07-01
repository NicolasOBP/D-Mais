import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useRepository,
} from "@infra";

import { useToast } from "@components";

import { ProductCart } from "..";

export function useCartDeleteItems(options?: MutationOptions<void>) {
  const { cart } = useRepository();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<void, { productCartIds: ProductCart["cartId"][] }>({
    mutationFn: ({ productCartIds }) => cart.deleteItems(productCartIds),
    onSuccess: (productCartIds) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cart],
      });

      options?.onSuccess?.(productCartIds);
    },
    onError: (error) => {
      showToast({
        type: "error",
        message: error.message,
      });
    },
  });
}
