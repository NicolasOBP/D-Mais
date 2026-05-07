import { useState } from "react";

import { ProductCart } from "@domain";

import { Icon } from "@components";
import { Box } from "@core-components";

import { ProductCartCheckbox } from "./components/ProductCartCheckbox";
import { ProductCartDetails } from "./components/ProductCartDetails";

type CartProductCardProps = {
  product: ProductCart;
  isSelected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  onRemove?: () => void;
};

export function CartProductCard({
  product,
  isSelected = false,
  onSelectChange,
  onRemove,
}: CartProductCardProps) {
  const [selected, setSelected] = useState(isSelected);

  const handleSelectChange = () => {
    const newState = !selected;
    setSelected(newState);
    onSelectChange?.(newState);
  };

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

      <Icon name="trash" size={27} color="primary" />
    </Box>
  );
}
