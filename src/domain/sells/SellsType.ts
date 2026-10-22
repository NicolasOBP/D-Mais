import type { AuthUser } from "../auth"
import type { ProductCart } from "../cart"
import type { ProductPriceRequestItem } from "../product"

export type SendCartAPIContent = {
	STATUS: string
	MENSAGEM?: string
}

export type SendCartAPI = {
	result: (SendCartAPIContent | string)[]
}

export type SendCartItems = ProductPriceRequestItem[]

export type SellsListAPI<T> = {
	result: T[][]
}

export type ClientAPIContent = {
	C_RGCLI: string
	C_CGC_CPF: string
	C_NMFANT: string
	C_RAZSO: string
	C_ENDER: string
	C_BAIRRO: string | null
	C_CIDADE: string | null
	C_UF: string | null
	C_CEP: string | null
	C_RGVEND: string | null
	C_CONDPAGTO: string | null
	C_LOCAL: string | null
	C_VLLIMITETOTAL: number
	C_TPPESSOA: string
	C_GRUPOPES?: string
	C_RG_INSCR?: string
	C_ENDER_NUMERO?: string
	C_ENDER_COMPL?: string
	C_CDMUNIC?: string
	C_FONECONT?: string
}

export type TruckPickupAPIContent = {
	C_PLACA: string
	C_RGCLI: string
	C_NMFANT: string | null
	C_MODELO: string
	C_KM: number
	C_UF: string
	C_RNTC: string
}

export type DriverAPIContent = {
	C_RGCLI: string
	C_CGC_CPF: string
	C_NMFANT: string
	C_RAZSO: string
	C_ENDER: string
	C_BAIRRO: string | null
	C_CIDADE: string | null
	C_UF: string | null
	C_CEP: string | null
	C_RGVEND: string | null
	C_CONDPAGTO: string | null
	C_VLLIMITETOTAL: number
	C_TPPESSOA: string
	C_VLUNFRETE: number
}

export type CompanyAPIContent = {
	C_RGCLI: string
	C_CGC_CPF: string
	C_NMFANT: string
	C_RAZSO: string
	C_ENDER: string
	C_BAIRRO: string
	C_CIDADE: string
	C_UF: string
	C_CEP: string
	C_TPPESSOA: string
	C_RG_INSCR: string
	C_ENDER_NUMERO: string
	C_ENDER_COMPL: string
}

export type PaymentTermsAPIContent = {
	CODIGO: string
	DIAS: string
	TABELA: string
}

export type PaymentMethodAPIContent = {
	CAM1: string
	CAM2: string
}

export type FinalOrderPriceResult = {
	orderTotalPrice: number
	farePrice: number
	orderProductItems: ProductCart[]
}

export type CalcFinalOrderVariables = {
	requestProducts: ProductCart | ProductCart[]
	authUser: AuthUser
	client: Client
	paymentTerms: PaymentTerms
	paymentMethod: PaymentMethod
	isFareSelected: boolean
}

export type Client = {
	name: string
	corporateReason: string
	rg: string
}

export type TruckPickup = {
	id: string
	licensePlate: string
}

export type Driver = {
	name: string
	rg: string
}

export type Company = {
	name: string
	rg: string
}

export type PaymentTerms = {
	id: string
	description: string
	table: string
}

export type PaymentMethod = {
	id: string
	description: string
}
