import { useState } from "react";

import { ProductCart, useCartDeleteItem, useCartEditVolume } from "@domain";
import { useProductVolumeModal } from "@hooks";
import { CartSchema } from "@schemas";

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
  const { showModal } = useModal();
  const { editVolume } = useCartEditVolume({
    onSuccess: (product) => {
      closeModal();
      resetForm({ volume: product.volume.toString() });
    },
  });
  const { deleteItem } = useCartDeleteItem({
    onSuccess: () => {
      closeModal();
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
  });

  const handleSelectChange = () => {
    const newState = !selected;
    setSelected(newState);
    onSelectChange?.(newState);
  };

  function handleRemoveProduct() {
    showModal({
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
            deleteItem(product.cartId);
          },
        },
      },
    });
  }

  function onSubmitEdit({ volume }: CartSchema) {
    const newVolumeNumber = Number.parseInt(volume);

    editVolume({ productCartId: product.cartId, newVolume: newVolumeNumber });
  }

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

      <ProductCartDetails
        product={product}
        handleEditProduct={handleEditProduct}
      />

      <Icon
        name="trash"
        size={27}
        color="primary"
        onPress={handleRemoveProduct}
      />
    </Box>
  );
}
