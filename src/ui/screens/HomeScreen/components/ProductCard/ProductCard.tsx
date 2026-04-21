import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Box, BoxProps, Button, PressableBox, Text } from "@core-components";
import { Product } from "@domain";

import { useModal } from "@containers";

import { ModalBody } from "../ModalContent/ModalBody";

import { addCartSchema, AddCartSchema } from "./addCartSchema";

export interface ProductCardProps {
  product: Product;
  containerProps?: BoxProps;
}

export function ProductCard({ product, containerProps }: ProductCardProps) {
  const { control, handleSubmit, formState } = useForm<AddCartSchema>({
    resolver: zodResolver(addCartSchema),
    defaultValues: {
      volume: "",
    },
    mode: "onChange",
  });
  const { showModal, updateModalData } = useModal();

  useEffect(() => {
    updateModalData({ formState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  function onAddCart() {
    showModal(
      {
        headerTitle: "Litros",
        BodyComponent: <ModalBody name="volume" control={control} />,
        footerButton: {
          label: "Confirmar",
          onPress: handleSubmit(onSubmit),
        },
      },
      { formState },
    );
  }

  function onSubmit(data: AddCartSchema) {
    console.log({ data });
  }

  return (
    <PressableBox {...cardStyle} {...containerProps}>
      <Box {...contentStyle}>
        <Text>{product.title}</Text>

        <Text variant="text14" color="gray2" pb="s24">
          Preço por litro R$ {product.price.toFixed(2)}
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
