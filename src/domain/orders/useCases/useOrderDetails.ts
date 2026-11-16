import { QueryKeys, useAppQuery, useAuth, useRepository } from "@infra"

export function useOrderDetails(idrec: string, enabled = true) {
	const { orders, sells } = useRepository()
	const { authUser } = useAuth()

	return useAppQuery({
		queryKey: [QueryKeys.Orders, QueryKeys.OrdersDetails, authUser?.id, idrec],
		fetchData: async () => {
			if (!authUser) {
				throw new Error("Usuário não autenticado.")
			}

			const order = await orders.details(idrec, authUser.id)
			const drivers = await sells.driverList(order.driver.rg)
			const companies = await sells.companyList(order.company.rg)
			const trucks = await sells.truckPickupList(order.truck.licensePlate)
			const pickups = order.pickup ? await sells.truckPickupList(order.pickup.licensePlate) : []
			const paymentTerms = await sells.paymentTermsList(order.paymentTerms.id)
			const paymentMethods = await sells.paymentMethodsList(order.paymentMethod.id)

			return {
				...order,
				driver: findOrderLookup(drivers, (driver) => driver.rg === order.driver.rg, "motorista"),
				company: findOrderLookup(
					companies,
					(company) => company.rg === order.company.rg,
					"transportadora",
				),
				truck: findOrderLookup(
					trucks,
					(truck) => truck.licensePlate.toUpperCase() === order.truck.licensePlate.toUpperCase(),
					"caminhão",
				),
				pickup: order.pickup
					? findOrderLookup(
							pickups,
							(pickup) =>
								pickup.licensePlate.toUpperCase() === order.pickup?.licensePlate.toUpperCase(),
							"carreta",
						)
					: undefined,
				paymentTerms: findOrderLookup(
					paymentTerms,
					(item) => item.id === order.paymentTerms.id,
					"condição de pagamento",
				),
				paymentMethod: findOrderLookup(
					paymentMethods,
					(item) => item.id === order.paymentMethod.id,
					"forma de pagamento",
				),
			}
		},
		enabled: Boolean(authUser && idrec && enabled),
	})
}

function findOrderLookup<T>(items: T[], isMatch: (item: T) => boolean, label: string): T {
	const item = items.find(isMatch)
	if (!item) {
		throw new Error(`Não foi possível localizar ${label} do pedido.`)
	}

	return item
}
