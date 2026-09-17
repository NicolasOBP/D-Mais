import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type SellSchema, sellSchema } from "./sellSchema"

export function useSellForm() {
	const { control, handleSubmit, formState, reset } = useForm<SellSchema>({
		resolver: zodResolver(sellSchema),
		defaultValues: {
			cliente: { cnpjCpf: "", name: "", corporateReason: "" },
			condicaoPagamento: "",
			formaPagamento: "",
			tabela: "",
			frete: false,
			caminhao: { licensePlate: "" },
			carreta: { licensePlate: "" },
			motorista: { cpf: "", name: "" },
			transportadora: { cnpj: "", name: "" },
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
