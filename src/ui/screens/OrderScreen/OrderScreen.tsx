import { useOrdersList } from "@domain";

import { ScreenHeader } from "@components";
import { Screen } from "@containers";

export function OrderScreen() {
  const { data } = useOrdersList();

  console.log({ data });

  return (
    <Screen>
      <ScreenHeader title="Pedidos" />
    </Screen>
  );
}
