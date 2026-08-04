import { useEffect } from "react";

import { ProductCartScreen, useCartDeleteItem } from "@domain";

import { Icon, useModal } from "@components";
import { Box, PressableBox, PressableBoxProps, Text } from "@core-components";

import { ProductCartCheckbox } from "./components/ProductCartCheckbox";
import { ProductCartDetails } from "./components/ProductCartDetails";

type CartProductCardProps = {
  product: ProductCartScreen;
  onSelectChange?: () => void;
};

export function CartProductCard({
  product,
  onSelectChange,
}: CartProductCardProps) {
  const { showModal, updateModalData, closeModal } = useModal();

  const { mutate: deleteItem, isPending } = useCartDeleteItem({
    onSuccess: () => {
      closeModal();
    },
  });

  const handleSelectChange = () => {
    onSelectChange?.();
  };

  function handleRemoveProduct() {
    showModal(
      {
        headerTitle: "Remover produto",
        headerSubtitle: product.title,
        BodyComponent: (
          <Box paddingHorizontal="s48">
            <Text variant="title16" color="errorText" textAlign="center">
              Deseja realmente excluir esse item do carrinho?
            </Text>
          </Box>
        ),
        footerButton: {
          twoButtonFooter: {
            labelCancel: "Cancelar",
            labelConfirm: "Deletar",
            onConfirm: () => {
              deleteItem({ productCartId: product.cartId });
            },
          },
        },
      },
      { isLoading: isPending },
    );
  }

  useEffect(() => {
    updateModalData({ isLoading: isPending });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return (
    <PressableBox {...pressableBoxStyle}>
      <ProductCartCheckbox
        handleSelectChange={handleSelectChange}
        selected={product.isSelected}
      />

      <ProductCartDetails product={product} />

      <Icon
        name="trash"
        size={27}
        color="primary"
        onPress={handleRemoveProduct}
      />
    </PressableBox>
  );
}

const pressableBoxStyle: PressableBoxProps = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  pb: "s12",
  marginBottom: "s12",
  gap: "s16",
};
