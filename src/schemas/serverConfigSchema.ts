import z from "zod"

export const serverConfigSchema = z.object({
	serverAddress: z.string(),
})

export type ServerConfigSchema = z.infer<typeof serverConfigSchema>
