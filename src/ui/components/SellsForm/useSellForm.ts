import { useState } from "react"

import {
	useSellClientList,
	useSellCompanyList,
	useSellDriverList,
	useSellPaymentMethodsList,
	useSellPaymentTermsList,
	useSellTruckPickupList,
} from "@domain"

import { useDebounce } from "@utils"

export function useSellForm(enabled: boolean) {
	const [clientSearch, setClientSearch] = useState("")
	const [driverSearch, setDriverSearch] = useState("")
	const [companySearch, setCompanySearch] = useState("")
	const [truckPlateSearch, setTruckPlateSearch] = useState("")
	const [pickupPlateSearch, setPickupPlateSearch] = useState("")
	const searchClient = getFirstThreeWords(useDebounce(clientSearch))
	const searchDriver = getFirstThreeWords(useDebounce(driverSearch))
	const searchCompany = getFirstThreeWords(useDebounce(companySearch))
	const searchTruck = getFirstThreeWords(useDebounce(truckPlateSearch))
	const searchPickup = getFirstThreeWords(useDebounce(pickupPlateSearch))

	const clientQuery = useSellClientList(enabled, searchClient)
	const driverQuery = useSellDriverList(enabled, searchDriver)
	const companyQuery = useSellCompanyList(enabled, searchCompany)
	const truckQuery = useSellTruckPickupList(enabled, searchTruck)
	const pickupQuery = useSellTruckPickupList(enabled, searchPickup)
	const paymentTermsQuery = useSellPaymentTermsList(enabled)
	const paymentMethodsQuery = useSellPaymentMethodsList(enabled)

	return {
		setPickupPlateSearch,
		setTruckPlateSearch,
		setClientSearch,
		setDriverSearch,
		setCompanySearch,
		client: {
			list: clientQuery.data,
			isLoading: clientQuery.isLoading,
			isError: !!clientQuery.error,
			refetch: clientQuery.refetch,
		},
		driver: {
			list: driverQuery.data,
			isLoading: driverQuery.isLoading,
			isError: !!driverQuery.error,
			refetch: driverQuery.refetch,
		},
		company: {
			list: companyQuery.data,
			isLoading: companyQuery.isLoading,
			isError: !!companyQuery.error,
			refetch: companyQuery.refetch,
		},
		truck: {
			list: truckQuery.data,
			isLoading: truckQuery.isLoading,
			isError: !!truckQuery.error,
			refetch: truckQuery.refetch,
		},
		pickup: {
			list: pickupQuery.data,
			isLoading: pickupQuery.isLoading,
			isError: !!pickupQuery.error,
			refetch: pickupQuery.refetch,
		},
		paymentTerms: {
			list: paymentTermsQuery.data,
			isLoading: paymentTermsQuery.isLoading,
			isError: !!paymentTermsQuery.error,
			refetch: paymentTermsQuery.refetch,
		},
		paymentMethods: {
			list: paymentMethodsQuery.data,
			isLoading: paymentMethodsQuery.isLoading,
			isError: !!paymentMethodsQuery.error,
			refetch: paymentMethodsQuery.refetch,
		},
	}
}

function getFirstThreeWords(value: string) {
	const words = value.trim().slice(0, 3)

	return words.length === 3 ? words : ""
}
