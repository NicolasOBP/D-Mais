import type { AuthUser, IAuthRepo } from "@domain"

import { mockAuthUsers } from "./data/mockAuthUsers"

let Users: AuthUser[] = [...mockAuthUsers]

export class InMemoryAuthRepo implements IAuthRepo {
	async signIn(company: string, _password: string, userName: string): Promise<AuthUser> {
		const user = Users.find((user) => user.company === company && user.userName === userName)

		if (user) {
			return user
		}

		throw new Error("Usuário não encontrado", {
			cause: "Verifique suas credenciais e tente novamente",
		})
	}

	async getUserById(userId: string | null): Promise<AuthUser | null> {
		if (!userId) {
			return null
		}

		const user = Users.find((user) => user.id === userId)

		if (!user) {
			throw new Error("Usuário não encontrado")
		}

		return user
	}

	async checkLeftQuota(userId: string, quota: number): Promise<void> {
		const user = Users.find((user) => user.id === userId)

		if (!user) {
			throw new Error("Usuário não encontrado")
		}

		if (user.leftQuota < quota) {
			throw new Error("Quota insuficiente", {
				cause: "Você não possui quota suficiente para realizar esta venda",
			})
		}
	}

	async updateLeftQuota(userId: string, usedQuota: number): Promise<void> {
		const user = Users.find((user) => user.id === userId)

		if (!user) {
			throw new Error("Usuário não encontrado")
		}

		user.leftQuota -= usedQuota
	}

	async signOut(): Promise<void> {}
}
