import { Order } from "@domain";
import { useNumberFormat } from "@utils";

import { Box, BoxProps, Text } from "@core-components";

import { statusStyleMap } from "./statusStyleMap";

export interface OrdersProductCardProps {
  order: Order;
  containerProps?: BoxProps;
}

export function OrdersProductCard({
  order,
  containerProps,
}: OrdersProductCardProps) {
  const orderStatus = statusStyleMap[order.status];

  return (
    <Box {...cardBoxStyle}>
      <Box {...statusBoxStyle} {...orderStatus.style}>
        <Text variant="title12" textAlign="center">
          {orderStatus.label}
        </Text>
      </Box>

      <Box flex={1} p="s6" justifyContent="space-between">
        <Text variant="title12" pb="s12">
          {order.client.name}
        </Text>

        <Box flexDirection="row" justifyContent="space-between" pb="s12">
          <Box flex={1}>
            {order.products.map((product, index) => (
              <Text
                key={`${product.cartId}-${index}`}
                variant="text10"
                color="primary"
                mb="s2"
              >
                {product.title}
              </Text>
            ))}
          </Box>

          <Box>
            {order.products.map((product, index) => (
              <Text
                key={`volume-${product.cartId}-${index}`}
                variant="text10"
                color="primary"
                mb="s2"
                textAlign="right"
              >
                {product.volume} L
              </Text>
            ))}
          </Box>
        </Box>

        <Text variant="title14" textAlign="right">
          {useNumberFormat.toBRLCurrency(order.totalPrice)}
        </Text>
      </Box>
    </Box>
  );
}

const cardBoxStyle: BoxProps = {
  borderRadius: "default",
  borderWidth: 1,
  borderColor: "primary",
  backgroundColor: "background",
  overflow: "hidden",
};

const statusBoxStyle: BoxProps = {
  paddingVertical: "s4",
  paddingHorizontal: "s48",
  alignItems: "center",
  justifyContent: "center",
};
