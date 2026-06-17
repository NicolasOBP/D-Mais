import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useRepository,
} from "@infra";

import { useToast } from "@components";

import { OrderVariables } from "../OrdersType";

export function useOrdersAdd(options?: MutationOptions<void>) {
  const { orders } = useRepository();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<void, OrderVariables>({
    mutationFn: (order) => orders.add(order),
    onSuccess: () => {
      showToast({
        type: "success",
        message: "Pedido enviado com sucesso!",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] });

      options?.onSuccess?.();
    },
  });
}
