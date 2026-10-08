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
