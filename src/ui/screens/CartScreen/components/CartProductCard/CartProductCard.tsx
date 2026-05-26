import { useEffect, useState } from "react";

import { ProductCart, useCartDeleteItem } from "@domain";

import { Icon } from "@components";
import { useModal } from "@containers";
import { Box, Text } from "@core-components";

import { ProductCartCheckbox } from "./components/ProductCartCheckbox";
import { ProductCartDetails } from "./components/ProductCartDetails";

type CartProductCardProps = {
  product: ProductCart;
  isSelected?: boolean;
  onSelectChange?: (selected: boolean) => void;
};

export function CartProductCard({
  product,
  isSelected = false,
  onSelectChange,
}: CartProductCardProps) {
  const [selected, setSelected] = useState(isSelected);
  const { showModal, updateModalData, closeModal } = useModal();

  const { mutate: deleteItem, isPending } = useCartDeleteItem({
    onSuccess: () => {
      closeModal();
    },
  });

  const handleSelectChange = () => {
    const newState = !selected;
    setSelected(newState);
    onSelectChange?.(newState);
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
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pb="s12"
      marginBottom="s12"
      gap="s16"
    >
      <ProductCartCheckbox
        handleSelectChange={handleSelectChange}
        selected={selected}
      />

      <ProductCartDetails product={product} />

      <Icon
        name="trash"
        size={27}
        color="primary"
        onPress={handleRemoveProduct}
      />
    </Box>
  );
}
