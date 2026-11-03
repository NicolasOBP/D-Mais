import { create } from "axios"

import { useServerConfigStore } from "../../../serverConfigStore"

const DEFAULT_BASE_URL = "https://denture-caretaker-aeration.ngrok-free.dev/datasnap/rest/"
const getBaseUrl = (serverAddress: string) =>
	serverAddress ? `http://${serverAddress}/datasnap/rest/` : DEFAULT_BASE_URL

export let BASE_URL = getBaseUrl(useServerConfigStore.getState().serverAddress)
export const API = create({
	baseURL: BASE_URL,
	timeout: 7000,
	auth: {
		username: "REDE1",
		password: "01",
	},
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

useServerConfigStore.subscribe(({ serverAddress }) => {
	BASE_URL = getBaseUrl(serverAddress)
	API.defaults.baseURL = BASE_URL
})
