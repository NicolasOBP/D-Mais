import z from "zod"

export const serverConfigSchema = z.object({
	serverAddress: z
		.string()
		.regex(/^\d{1,3}(?:\.\d{1,3}){3}:\d{1,5}$/, "Informe um IP e uma porta válidos")
		.refine(
			(value) => {
				const [ip, port] = value.split(":")
				const isValidIp = ip.split(".").every((octet) => Number(octet) <= 255)
				const portNumber = Number(port)

				return isValidIp && portNumber >= 1 && portNumber <= 65535
			},
			{ message: "Informe um IP e uma porta válidos" },
		),
})

export type ServerConfigSchema = z.infer<typeof serverConfigSchema>
