import { useEffect } from "react";

import { Product, useInventoryList } from "@domain";
import { ProductSchema, useProductForm, UseProductFormProps } from "@schemas";

import { ProductModalBody, useModal } from "@components";

type ProductVolumeModalProps = UseProductFormProps & {
  product: Product;
  onSubmit: (values: ProductSchema) => void;
  isEdit?: boolean;
  isLoading: boolean;
};

export function useProductVolumeModal({
  defaultVolume,
  product,
  onSubmit,
  isEdit,
  isLoading,
  defaultInventory,
}: ProductVolumeModalProps) {
  const { control, handleSubmit, formState, reset } = useProductForm({
    defaultVolume,
    defaultInventory,
  });
  const { inventoryList } = useInventoryList();

  const { showModal, updateModalData, closeModal } = useModal();

  function handleShowModal() {
    if (isEdit) {
      showModal(
        {
          headerTitle: `Editar Produto`,
          headerSubtitle: product.title,
          BodyComponent: (
            <ProductModalBody inventoryList={inventoryList} control={control} />
          ),
          footerButton: {
            oneButtonFooter: {
              label: "Confirmar",
              onPress: handleSubmit(onSubmit),
            },
          },
        },
        { formState, reset, isLoading },
      );
    } else {
      showModal(
        {
          headerTitle: `${product.title}`,
          BodyComponent: (
            <ProductModalBody inventoryList={inventoryList} control={control} />
          ),
          footerButton: {
            oneButtonFooter: {
              label: "Confirmar",
              onPress: handleSubmit(onSubmit),
            },
          },
        },
        { formState, reset, isLoading },
      );
    }
  }

  useEffect(() => {
    updateModalData({ formState, isLoading });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, isLoading]);

  return { handleShowModal, closeModal, reset };
}
