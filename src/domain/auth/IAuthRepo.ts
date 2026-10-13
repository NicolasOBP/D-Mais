import type { AuthUser } from "./AuthTypes"

export interface IAuthRepo {
	signIn: (company: string, password: string, userName: string) => Promise<AuthUser>
	signOut: () => Promise<void>
	checkLeftQuota: (user: AuthUser | null, quota: number) => Promise<void>
	updateLeftQuota: (userId: string, usedQuota: number) => Promise<void>
	getUserById: (userId: string | null) => Promise<AuthUser | null>
}
