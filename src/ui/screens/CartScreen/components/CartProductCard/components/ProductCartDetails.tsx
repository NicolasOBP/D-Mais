import { ProductCart } from "@domain";
import { useNumberFormat } from "@utils";

import { Icon } from "@components";
import { Box, BoxProps, Text } from "@core-components";

type Props = {
  product: ProductCart;
  handleEditProduct: () => void;
};

export function ProductCartDetails({ product, handleEditProduct }: Props) {
  const totalProductPrice = useNumberFormat.toBRLCurrency(
    product.price * product.volume,
  );

  return (
    <Box {...detailsContainer}>
      <Text
        variant="text16Bold"
        color="text"
        numberOfLines={1}
        textAlign="center"
      >
        {product.title}
      </Text>

      <Box flexDirection="row" justifyContent="space-between" mt="s14">
        <Box>
          <Text variant="text12Bold" color="text" mb="s4">
            Quantidade:{" "}
            {useNumberFormat.formatNumberWithThousands(product.volume)} L
          </Text>

          <Text variant="text12Bold" color="text">
            Total: {totalProductPrice}
          </Text>
        </Box>

        <Icon name="pencil" color="primary" onPress={handleEditProduct} />
      </Box>
    </Box>
  );
}

const detailsContainer: BoxProps = {
  borderRadius: "default",
  borderWidth: 2,
  borderColor: "primary",
  flex: 1,
  flexShrink: 1,
  flexGrow: 1,
  paddingHorizontal: "s12",
  paddingVertical: "s8",
};
