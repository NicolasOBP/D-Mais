import { z } from "zod"

export const fuelResponseSchema = z.object({
	result: z.array(
		z.array(
			z.object({
				C_CDPRO: z.union([z.string(), z.number()]).transform(String),
				C_DESC: z.string(),
			}),
		),
	),
})

export type FuelResult = z.infer<typeof fuelResponseSchema>["result"][number][number]
