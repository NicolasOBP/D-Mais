export type Client = {
	name: string
	corporateReason: string
	cnpjCpf: string
}

export type Truck = {
	licensePlate: string
}

export type Pickup = {
	licensePlate: string
}

export type Driver = {
	name: string
	cpf: string
}

export type Company = {
	name: string
	cnpj: string
}

export type PaymentTerms = {
	id: string
	description: string
}

export type PaymentMethod = {
	id: string
	description: string
}
