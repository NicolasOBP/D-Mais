import { z } from "zod"

export const loginResponseSchema = z.object({
	result: z.array(
		z.object({
			STATUS: z.string(),
			MENSAGEM: z.string(),
			C_CDEMPR: z
				.union([z.string(), z.number()])
				.nullish()
				.transform((value) => (value == null ? undefined : String(value))),
			C_POSTO: z
				.union([z.string(), z.number()])
				.nullish()
				.transform((value) => (value == null ? undefined : String(value))),
		}),
	),
})

export type LoginResponseResult = z.infer<typeof loginResponseSchema>["result"][number]
