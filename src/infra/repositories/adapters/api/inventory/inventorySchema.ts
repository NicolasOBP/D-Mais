import { z } from "zod"

export const inventoryResponseSchema = z.object({
	result: z.array(
		z.array(
			z.object({
				C_CODESTOQUE: z.union([z.string(), z.number()]).transform(String),
				C_DESCESTOQUE: z.string(),
			}),
		),
	),
})

export type InventoryResult = z.infer<typeof inventoryResponseSchema>["result"][number][number]
