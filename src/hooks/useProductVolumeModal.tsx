import { useEffect } from "react"

import { type Product, useInventoryList } from "@domain"

import { type ProductSchema, type UseProductFormProps, useProductForm } from "@schemas"

import { ProductModalBody, useModal } from "@components"

type ProductVolumeModalProps = UseProductFormProps & {
	product: Product
	onSubmit: (values: ProductSchema) => void
	isEdit?: boolean
	isLoading: boolean
}

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
	})
	const { inventoryList, isLoading: isLoadingInventory } = useInventoryList()

	const { showModal, updateModalData, closeModal } = useModal()

	function handleShowModal() {
		if (isEdit) {
			showModal(
				{
					headerTitle: `Editar Produto`,
					headerSubtitle: product.title,
					BodyComponent: <ProductModalBody inventoryList={inventoryList} control={control} />,
					footerButton: {
						oneButtonFooter: {
							label: "Confirmar",
							onPress: handleSubmit(onSubmit),
						},
					},
				},
				{ formState, reset, isLoading, updatedInventoryList: inventoryList, isLoadingInventory },
			)
		} else {
			showModal(
				{
					headerTitle: `${product.title}`,
					BodyComponent: <ProductModalBody inventoryList={inventoryList} control={control} />,
					footerButton: {
						oneButtonFooter: {
							label: "Confirmar",
							onPress: handleSubmit(onSubmit),
						},
					},
				},
				{ formState, reset, isLoading, updatedInventoryList: inventoryList, isLoadingInventory },
			)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary re-render
	useEffect(() => {
		updateModalData({
			formState,
			isLoading,
			updatedInventoryList: inventoryList,
			isLoadingInventory,
		})
	}, [formState, isLoading, inventoryList, isLoadingInventory])

	return { handleShowModal, closeModal, reset }
}
