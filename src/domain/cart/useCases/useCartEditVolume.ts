import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationOptions, QueryKeys, useRepository } from "@infra";

import { ProductCart } from "..";

export function useCartEditVolume(options?: MutationOptions<ProductCart>) {
  const { cart } = useRepository();
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess, isPending } = useMutation<
    ProductCart,
    Error,
    { productCartId: number; newVolume: number }
  >({
    mutationFn: ({ productCartId, newVolume }) =>
      cart.editVolume(productCartId, newVolume),
    retry: false,
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

  return {
    editVolume: (prod: { productCartId: number; newVolume: number }) =>
      mutate(prod),
    isError,
    isSuccess,
    isPending,
  };
}
