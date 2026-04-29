import { useMutation } from "@tanstack/react-query";

import { MutationOptions, useRepository } from "@infra";

import { useToast } from "@components";

import { ProductCart } from "..";

export function useCartAdd(options?: MutationOptions<ProductCart>) {
  const { cart } = useRepository();
  const { showToast } = useToast();

  const { mutate, isError, isSuccess, isPending } = useMutation<
    ProductCart,
    Error,
    ProductCart
  >({
    mutationFn: (prod) => cart.add(prod),
    retry: false,
    onSuccess: (prod) => {
      showToast({
        type: "success",
        message: "Produto adicionado ao carrinho!",
        duration: 1000,
      });
      console.log(`foi com`, { prod });

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
    addCart: (prod: ProductCart) => mutate(prod),
    isError,
    isSuccess,
    isPending,
  };
}
