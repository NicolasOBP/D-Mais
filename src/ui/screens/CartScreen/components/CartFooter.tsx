import { useNumberFormat } from "@utils";

import { Icon } from "@components";
import { Box, Text } from "@core-components";

type Props = {
  totalPrice: number;
  totalItems: number;
  onCheckout: () => void;
};

export function CartFooter({ onCheckout, totalItems, totalPrice }: Props) {
  const totalItemsText = totalItems === 1 ? "item" : "itens";

  return (
    <Box
      bg="carrot"
      style={{ width: "100%" }}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box bg="primary" flex={1} paddingVertical="s8" pl="s10">
        <Text mb="s20" variant="text12Bold">
          Total: {useNumberFormat.toBRLCurrency(totalPrice)}
        </Text>
        <Text variant="text12Bold">
          {totalItems} {totalItemsText}
        </Text>
      </Box>

      <Box
        justifyContent="center"
        bg="primary"
        paddingVertical="s8"
        paddingHorizontal="s10"
        borderLeftWidth={2}
        borderLeftColor="white"
        alignItems="center"
      >
        <Icon name="chevronRight" color="white" size={50} />
      </Box>
    </Box>
  );
}
