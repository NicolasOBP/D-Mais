import type { AuthUser } from "./AuthUser"

export interface IAuthRepo {
	signIn: (company: string, password: string, userName: string) => Promise<AuthUser>
	signOut: () => Promise<void>
	checkLeftQuota: (userId: string, quota: number) => Promise<void>
	updateLeftQuota: (userId: string, usedQuota: number) => Promise<void>
	getUserById: (userId: string | null) => Promise<AuthUser | null>
}
