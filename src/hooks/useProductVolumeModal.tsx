import { useEffect } from "react";

import { Product } from "@domain";
import { ProductSchema, useProductForm } from "@schemas";

import { ProductModalBody, useModal } from "@components";

type ProductVolumeModalProps = {
  defaultVolume: string;
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
}: ProductVolumeModalProps) {
  const { control, handleSubmit, formState, reset } = useProductForm({
    defaultVolume,
  });

  const { showModal, updateModalData, closeModal } = useModal();

  function handleShowModal() {
    if (isEdit) {
      showModal(
        {
          headerTitle: `Editar Produto`,
          headerSubtitle: product.title,
          BodyComponent: <ProductModalBody control={control} />,
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
          BodyComponent: <ProductModalBody control={control} />,
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
