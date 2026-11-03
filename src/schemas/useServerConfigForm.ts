import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ServerConfigSchema, serverConfigSchema } from "./serverConfigSchema"

export function useServerConfigForm(serverAddress: string) {
	const { control, formState, handleSubmit } = useForm<ServerConfigSchema>({
		resolver: zodResolver(serverConfigSchema),
		defaultValues: { serverAddress },
		mode: "onChange",
	})

	return {
		handleSubmit,
		control,
		formState,
	}
}
