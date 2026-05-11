import { useEffect, useState } from "react";

import { ProductCart } from "@domain";
import { CartSchema, useProductForm } from "@schemas";

import { Icon, ProductModalBody } from "@components";
import { useModal } from "@containers";
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
  const { control, formState, handleSubmit, reset } = useProductForm({
    defaultVolume: product.volume.toString(),
  });

  const { showModal, updateModalData } = useModal();

  const handleSelectChange = () => {
    const newState = !selected;
    setSelected(newState);
    onSelectChange?.(newState);
  };

  function handleRemoveProduct() {}

  function handleEditProduct() {
    showModal(
      {
        headerTitle: `Editar Litros`,
        headerSubtitle: product.title,
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

    console.log(volumeNumber);
  }

  useEffect(() => {
    updateModalData({ formState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

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
