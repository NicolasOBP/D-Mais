import type { AuthUser } from "@domain"

export const mockAuthUsers: AuthUser[] = [
	{
		email: "esse@gmail.com",
		name: "Fulano da Silva",
		id: "1",
		company: "d++",
		userName: "456",
		quota: 100,
		leftQuota: 100,
	},
	{
		email: "aquele@gmail.com",
		name: "Siclano da Silva",
		id: "2",
		company: "d--",
		userName: "123",
		quota: 100,
		leftQuota: 100,
	},
]
