import type { Inventory } from "@domain"

import { mockProducts } from "./mockProducts"

export const mockInventory: Inventory[] = [
	{
		id: "A1",
		baseCode: "001",
		description: "Usina XYZ",
		affiliate: "Parceiro X",
		products: mockProducts.map((product) => ({
			...product,
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A2",
		description: "Usina SP",
		baseCode: "001",
		affiliate: "Parceiro Y",
		products: mockProducts.map((product) => ({
			...product,
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A3",
		description: "Usina RJ",
		baseCode: "001",
		affiliate: "Parceiro Z",
		products: mockProducts.map((product) => ({
			...product,
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A4",
		description: "Usina MG",
		baseCode: "001",
		affiliate: "Parceiro A",
		products: mockProducts.map((product) => ({
			...product,
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
	{
		id: "A5",
		description: "Usina ES",
		baseCode: "001",
		affiliate: "Parceiro B",
		products: mockProducts.map((product) => ({
			...product,
			volumeAvailable: Math.floor(Math.random() * 31) + 80,
		})),
	},
]
