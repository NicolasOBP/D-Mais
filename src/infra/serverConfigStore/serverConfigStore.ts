import { create } from "zustand"

import { createJSONStorage, persist } from "zustand/middleware"

import { zustandStorage } from "../storage"

type ServerConfigState = {
	serverAddress: string
	setServerAddress: (serverAddress: string) => void
}

export const useServerConfigStore = create<ServerConfigState>()(
	persist(
		(set) => ({
			serverAddress: "",
			setServerAddress: (serverAddress) => set({ serverAddress }),
		}),
		{
			name: "@serverConfig",
			storage: createJSONStorage(() => zustandStorage),
		},
	),
)
