export type AuthAPI = {
	result: AuthAPIContent[]
}
export type AuthAPIContent = {
	STATUS: string
	MENSAGEM: string
	C_POSTO: string
	C_CDEMPR: string
	C_RAZSO: string
}

export type AuthUser = {
	id: string
	company: string
	userName: string
	name: string
	quota: number
	leftQuota: number
}
