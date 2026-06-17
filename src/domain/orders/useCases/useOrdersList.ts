import { QueryKeys, useAppQuery, useRepository } from "@infra";

export function useOrdersList() {
  const { orders } = useRepository();

  return useAppQuery({
    queryKey: [QueryKeys.Orders],
    fetchData: () => orders.list(),
  });
}
