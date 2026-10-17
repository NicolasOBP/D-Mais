import { create } from "axios"

export const BASE_URL = "https://denture-caretaker-aeration.ngrok-free.dev/datasnap/rest/"
export const API = create({
	baseURL: BASE_URL,
	timeout: 15000,
	auth: {
		username: "REDE1",
		password: "01",
	},
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})
