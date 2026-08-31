import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { Inventory } from "@domain"

import { type ProductSchema, productSchema } from "./productSchema"

export type UseProductFormProps = {
	defaultVolume?: string
	defaultInventory?: Inventory
}

export function useProductForm({
	defaultVolume = "",
	defaultInventory = { description: "", id: "" },
}: UseProductFormProps) {
	const { control, handleSubmit, formState, reset } = useForm<ProductSchema>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			volume: defaultVolume,
			inventory: defaultInventory,
		},
		mode: "onChange",
	})

	return {
		control,
		handleSubmit,
		formState,
		reset,
	}
}
