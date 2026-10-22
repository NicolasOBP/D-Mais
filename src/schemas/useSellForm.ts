import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { OrderVariables } from "@domain"

import { type SellSchema, sellSchema } from "./sellSchema"

export function useSellForm(order?: OrderVariables) {
	const { control, handleSubmit, formState, reset, setValue, getValues } = useForm<SellSchema>({
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
					tabela: order.paymentTerms.table,
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
		setValue,
		getValues,
	}
}

const defaultValues: SellSchema = {
	cliente: { rg: "", name: "", corporateReason: "" },
	condicaoPagamento: { description: "", id: "", table: "" },
	formaPagamento: { description: "", id: "" },
	tabela: "",
	freteSelecionado: false,
	caminhao: { licensePlate: "", id: "" },
	motorista: { rg: "", name: "" },
	transportadora: { rg: "", name: "" },
}
