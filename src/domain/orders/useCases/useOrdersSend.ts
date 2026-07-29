import { useQueryClient } from "@tanstack/react-query";

import {
  MutationOptions,
  QueryKeys,
  useAppMutation,
  useCartService,
  useRepository,
} from "@infra";

import { useToast } from "@components";

import { Order, OrderVariables } from "../OrdersType";

export function useOrdersSend(options?: MutationOptions<Order>) {
  const { orders, cart } = useRepository();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { removeProductsFromCart } = useCartService();

  return useAppMutation<Order, OrderVariables>({
    mutationFn: (order) => orders.send(order),
    onSuccess: (order) => {
      showToast({
        type: "success",
        message: "Pedido enviado com sucesso!",
      });

      cart.deleteItems(order.products.map((prod) => prod.cartId));
      removeProductsFromCart(order.products.map((prod) => prod.cartId));

      queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });

      options?.onSuccess?.(order);
    },
  });
}
