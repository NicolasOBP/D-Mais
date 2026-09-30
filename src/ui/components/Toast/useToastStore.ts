import { create } from "zustand"

export type ToastTypes = "success" | "error" | "warning"

export type Toast = {
	message: string
	type: ToastTypes
	description?: string
	duration?: number
}

export const initialToastState: { toast: Toast } = {
	toast: {
		message: "",
		type: "success",
		description: "",
		duration: 2000,
	},
}

export type ToastStoreType = { toast: Toast } & {
	/**
	 * Default Toast duration is 2 sec
	 * @returns
	 */
	showToast: (toast: Toast) => void
	closeToast: () => void
}

const useToastStoreBase = create<ToastStoreType>()((set) => ({
	...initialToastState,
	showToast: (toast) =>
		set(() => ({
			toast: {
				...toast,
				duration: toast.duration ? toast.duration : initialToastState.toast.duration,
			},
		})),
	closeToast: () => set(() => initialToastState),
}))

export function useToastStoreZustand(): Pick<ToastStoreType, "toast"> {
	const toast = useToastStoreBase((state) => state.toast)

	return { toast }
}

export function useToastServiceZustand(): Omit<ToastStoreType, "toast"> {
	const showToast = useToastStoreBase((state) => state.showToast)
	const closeToast = useToastStoreBase((state) => state.closeToast)

	return { showToast, closeToast }
}

export { useToastStoreBase as useToastStore }
