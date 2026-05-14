import { useState } from "react";

import { ProductCart, useCartEditVolume } from "@domain";
import { useProductVolumeModal } from "@hooks";
import { CartSchema } from "@schemas";

import { Icon } from "@components";
import { Box } from "@core-components";

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

  const { editVolume } = useCartEditVolume({
    onSuccess: (product) => {
      closeModal();
      resetForm({ volume: product.volume.toString() });
    },
  });

  const handleSelectChange = () => {
    const newState = !selected;
    setSelected(newState);
    onSelectChange?.(newState);
  };

  function handleRemoveProduct() {}

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
