import { Product, useCartAdd } from "@domain";
import { useProductVolumeModal } from "@hooks";
import { CartSchema } from "@schemas";
import { useNumberFormat } from "@utils";

import { Box, BoxProps, Button, PressableBox, Text } from "@core-components";

export interface ProductCardProps {
  product: Product;
  containerProps?: BoxProps;
}

export function ProductCard({ product, containerProps }: ProductCardProps) {
  const { mutate: addCart, isPending } = useCartAdd({
    onSuccess: () => {
      resetForm();
      closeModal();
    },
  });

  const {
    closeModal,
    reset: resetForm,
    handleShowModal,
  } = useProductVolumeModal({
    defaultVolume: "",
    product,
    onSubmit,
    isLoading: isPending,
  });

  function onSubmit({ volume }: CartSchema) {
    const volumeNumber = Number.parseInt(volume);

    addCart({ ...product, volume: volumeNumber });
  }

  return (
    <PressableBox {...cardStyle} {...containerProps}>
      <Box {...contentStyle}>
        <Text>{product.title}</Text>

        <Text variant="text14" color="gray2" pb="s24">
          Preço por litro {useNumberFormat.toBRLCurrency(product.price)}
        </Text>

        <Button
          variant="secondary"
          lable="Adicionar ao carrinho"
          onPress={handleShowModal}
          paddingVertical="s10"
          marginHorizontal="s32"
        />
      </Box>
    </PressableBox>
  );
}

const cardStyle: BoxProps = {
  backgroundColor: "background",
  borderRadius: "default",
  borderWidth: 1,
  borderColor: "primary",
};

const contentStyle: BoxProps = {
  padding: "s10",
  gap: "s8",
};
