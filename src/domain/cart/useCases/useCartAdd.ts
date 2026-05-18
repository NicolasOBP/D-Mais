import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationOptions, QueryKeys, useRepository } from "@infra";

import { useToast } from "@components";

import { ProductCart, ProductCartVariables } from "..";

export function useCartAdd(options?: MutationOptions<ProductCart>) {
  const { cart } = useRepository();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation<
    ProductCart,
    Error,
    ProductCartVariables
  >({
    mutationFn: (prod) => cart.add(prod),
    retry: false,
    onSuccess: (prod) => {
      showToast({
        type: "success",
        message: "Produto adicionado ao carrinho!",
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

  return {
    addCart: (prod: ProductCartVariables) => mutate(prod),
    isError,
    isSuccess,
    isPending,
  };
}
