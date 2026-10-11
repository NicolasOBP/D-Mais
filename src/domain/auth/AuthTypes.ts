export type AuthAPI = {
	result: {
		STATUS: string
		MENSAGEM: string
		C_POSTO: string
		C_CDEMPR: string
		C_RAZO: string
	}[]
}
export type AuthAPIContent = {
	STATUS: string
	MENSAGEM: string
	C_POSTO: string
	C_CDEMPR: string
	C_RAZO: string
}

export type AuthUser = {
	id: string
	company: string
	userName: string
	name?: string
	email?: string
	quota?: number
	leftQuota?: number
	message?: string
}
