import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { OrderVariables } from "@domain"

import { type SellSchema, sellSchema } from "./sellSchema"

export function useSellForm(order?: OrderVariables) {
	const { control, handleSubmit, formState, reset } = useForm<SellSchema>({
		resolver: zodResolver(sellSchema),
		defaultValues: order
			? {
					caminhao: order.truck,
					carreta: order.pickup,
					cliente: order.client,
					condicaoPagamento: order.paymentTerms,
					formaPagamento: order.paymentMethod,
					freteSelecionado: order.fareSelected,
					motorista: order.driver,
					tabela: order.table,
					transportadora: order.company,
				}
			: defaultValues,
		mode: "onChange",
	})

	return {
		control,
		handleSubmit,
		formState,
		reset,
	}
}

const defaultValues: SellSchema = {
	cliente: { cnpjCpf: "", name: "", corporateReason: "" },
	condicaoPagamento: { description: "", id: "" },
	formaPagamento: { description: "", id: "" },
	tabela: "",
	freteSelecionado: false,
	caminhao: { licensePlate: "" },
	motorista: { cpf: "", name: "" },
	transportadora: { cnpj: "", name: "" },
}
