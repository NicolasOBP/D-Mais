import { useContext } from "react"

import { AuthContext } from "./Providers/AuthProvider"

export function useAuth() {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error("Auth Context should be used within an AuthProvider")
	}

	return context
}
