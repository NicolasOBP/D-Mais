import { QueryKeys, useAppQuery, useRepository } from "@infra";

export function useSellClientList() {
  const { sells } = useRepository();

  return useAppQuery({
    queryKey: [QueryKeys.Sells, QueryKeys.SellsClientList],
    fetchData: sells.clientList,
    staleTime: 1000 * 30,
  });
}
