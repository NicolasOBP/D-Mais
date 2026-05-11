import { useEffect } from "react";

import { Product, useCartAdd } from "@domain";
import { CartSchema, useProductForm } from "@schemas";
import { useNumberFormat } from "@utils";

import { ProductModalBody } from "@components";
import { useModal } from "@containers";
import { Box, BoxProps, Button, PressableBox, Text } from "@core-components";

export interface ProductCardProps {
  product: Product;
  containerProps?: BoxProps;
}

export function ProductCard({ product, containerProps }: ProductCardProps) {
  const { control, handleSubmit, formState, reset } = useProductForm({
    defaultVolume: "",
  });
  const { showModal, updateModalData, closeModal } = useModal();
  const { addCart } = useCartAdd({
    onSuccess: () => {
      reset();
      closeModal();
    },
  });

  useEffect(() => {
    updateModalData({ formState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  function onAddCart() {
    showModal(
      {
        headerTitle: `Litros - ${product.title}`,
        BodyComponent: <ProductModalBody name="volume" control={control} />,
        footerButton: {
          label: "Confirmar",
          onPress: handleSubmit(onSubmit),
        },
      },
      { formState, reset },
    );
  }

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
          onPress={onAddCart}
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
