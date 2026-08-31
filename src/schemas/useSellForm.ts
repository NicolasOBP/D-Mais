import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { mockClients } from "../infra/repositories/adapters/inMemory/data/mockClients"
import { mockCompanies } from "../infra/repositories/adapters/inMemory/data/mockCompanies"
import { mockDrivers } from "../infra/repositories/adapters/inMemory/data/mockDrivers"
import { mockPickups } from "../infra/repositories/adapters/inMemory/data/mockPickups"
import { mockTrucks } from "../infra/repositories/adapters/inMemory/data/mockTrucks"

import { type SellSchema, sellSchema } from "./sellSchema"

export function useSellForm() {
	const { control, handleSubmit, formState, reset } = useForm<SellSchema>({
		resolver: zodResolver(sellSchema),
		defaultValues: {
			cliente: mockClients[0],
			condicaoPagamento: "45",
			tabela: "78",
			valorFrete: "65",
			caminhao: mockTrucks[0],
			carreta: mockPickups[0],
			motorista: mockDrivers[0],
			transportadora: mockCompanies[0],
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
