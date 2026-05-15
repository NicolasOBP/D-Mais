import { useEffect } from "react";

import { Product } from "@domain";
import { useProductForm } from "@schemas";

import { ProductModalBody } from "@components";
import { useModal } from "@containers";

type ProductVolumeModalProps = {
  defaultVolume: string;
  product: Product;
  onSubmit: ({ volume }: { volume: string }) => void;
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
          headerTitle: `Editar Litros`,
          headerSubtitle: product.title,
          BodyComponent: <ProductModalBody name="volume" control={control} />,
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
          headerTitle: `Litros - ${product.title}`,
          BodyComponent: <ProductModalBody name="volume" control={control} />,
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
