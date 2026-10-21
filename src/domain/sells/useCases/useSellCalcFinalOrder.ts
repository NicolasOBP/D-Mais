import { type MutationOptions, useAppMutation, useAuth, useRepository, useToast } from "@infra"

import type { CalcFinalOrderVariables, FinalOrderPriceResult } from "../SellsType"

export function useSellCalcFinalOrder(options?: MutationOptions<FinalOrderPriceResult>) {
	const { sells } = useRepository()
	const { authUser } = useAuth()
	const { showToast } = useToast()

	return useAppMutation<FinalOrderPriceResult, Omit<CalcFinalOrderVariables, "authUser">>({
		mutationFn: async ({ client, isFareSelected, paymentTerms, requestProducts }) => {
			if (!authUser) throw new Error("usuário não validado")

			return await sells.calcFinalOrderPrice({
				requestProducts: requestProducts,
				authUser,
				client,
				isFareSelected,
				paymentTerms,
			})
		},
		onSuccess: (orderResult) => {
			options?.onSuccess?.(orderResult)
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
				description: error.cause,
				duration: 3000,
			})

			options?.onError?.(error.message)
		},
	})
}
