import { QueryKeys, useAppQuery, useRepository } from "@infra";

export function useInventoryList() {
  const { inventory } = useRepository();

  return useAppQuery({
    fetchData: inventory.list,
    queryKey: [QueryKeys.Inventory, QueryKeys.InventoryList],
  });
}
