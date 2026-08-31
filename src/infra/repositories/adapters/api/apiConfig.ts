import { create } from "axios"

export const BASE_URL = "http://201.92.37.4:30500/"
export const API = create({
	baseURL: BASE_URL,
})
