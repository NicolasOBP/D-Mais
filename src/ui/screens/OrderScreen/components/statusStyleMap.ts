import type { OrdersStatus } from "@domain"

import type { BoxProps } from "@core-components"

export const statusStyleMap: Record<OrdersStatus, { label: string; style: BoxProps }> = {
	pending: {
		style: { backgroundColor: "pending" },
		label: "Pendente",
	},
	cancelled: {
		style: { backgroundColor: "error" },
		label: "Cancelado",
	},
	completed: {
		style: { backgroundColor: "success" },
		label: "Enviado",
	},
}
