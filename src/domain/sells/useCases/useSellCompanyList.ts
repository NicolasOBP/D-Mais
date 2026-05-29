import { QueryKeys, useAppQuery, useRepository } from "@infra";

export function useSellCompanyList() {
  const { sells } = useRepository();

  return useAppQuery({
    queryKey: [QueryKeys.Sells, QueryKeys.SellsCompanyList],
    fetchData: sells.companyList,
    staleTime: 1000 * 30,
  });
}
