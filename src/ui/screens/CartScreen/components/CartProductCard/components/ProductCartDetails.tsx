import { ProductCart, useCartEditVolume } from "@domain";
import { useProductVolumeModal } from "@hooks";
import { ProductSchema } from "@schemas";
import { useNumberFormat } from "@utils";

import { Icon } from "@components";
import { Box, BoxProps, Text } from "@core-components";

type Props = {
  product: ProductCart;
};

export function ProductCartDetails({ product }: Props) {
  const totalProductPrice = useNumberFormat.toBRLCurrency(
    product.price * product.volume,
  );

  const { mutate: editVolume, isPending } = useCartEditVolume({
    onSuccess: (product) => {
      closeModal();
      resetForm({ volume: product.volume.toString() });
    },
  });

  const {
    closeModal,
    reset: resetForm,
    handleShowModal: handleEditProduct,
  } = useProductVolumeModal({
    defaultVolume: product.volume.toString(),
    product,
    onSubmit: onSubmitEdit,
    isEdit: true,
    isLoading: isPending,
  });

  function onSubmitEdit({ volume }: ProductSchema) {
    const newVolumeNumber = Number.parseInt(volume);

    editVolume({ productCartId: product.cartId, newVolume: newVolumeNumber });
  }

  return (
    <Box {...containerBoxStyle}>
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

const containerBoxStyle: BoxProps = {
  borderRadius: "default",
  borderWidth: 2,
  borderColor: "primary",
  flex: 1,
  flexShrink: 1,
  flexGrow: 1,
  paddingHorizontal: "s12",
  paddingVertical: "s8",
};
