import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationOptions, QueryKeys, useRepository } from "@infra";

import { useToast } from "@components";

import { ProductCart } from "..";

export function useCartDeleteItem(options?: MutationOptions<void>) {
  const { cart } = useRepository();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation<
    void,
    Error,
    { productCartId: ProductCart["cartId"] }
  >({
    mutationFn: (prod) => cart.deleteItem(prod.productCartId),
    retry: false,
    onSuccess: (prod) => {
      showToast({
        type: "success",
        message: "Produto deletado!",
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NumberCart],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CartList],
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

  return {
    deleteItem: (productCartId: ProductCart["cartId"]) =>
      mutate({ productCartId }),
    isError,
    isSuccess,
    isPending,
  };
}
