import type { Inventory } from "@domain"

import { mockProducts } from "./mockProducts"

export const mockInventory: Inventory[] = [
	{
		id: "A1",
		description: "Usina XYZ",
		products: mockProducts.map((product) => ({
			...product,
			affiliate: "Parceiro X",
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A2",
		description: "Usina SP",
		products: mockProducts.map((product) => ({
			...product,
			affiliate: "Parceiro Y",
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A3",
		description: "Usina RJ",
		products: mockProducts.map((product) => ({
			...product,
			affiliate: "Parceiro Z",
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A4",
		description: "Usina MG",
		products: mockProducts.map((product) => ({
			...product,
			affiliate: "Parceiro A",
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A5",
		description: "Usina ES",
		products: mockProducts.map((product) => ({
			...product,
			affiliate: "Parceiro B",
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
]
