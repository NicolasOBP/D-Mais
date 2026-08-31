import { create } from "zustand"

const initialBackToSellState = {
	hasVisitedSell: false,
	showBackToSellButton: false,
	completedSell: false,
}

export type BackToSellStoreType = typeof initialBackToSellState & {
	markVisitedSell: () => void
	setShowBackToSell: (show: boolean) => void
	resetBackToSell: () => void
	finishSell: () => void
}

const useBackToSellStore = create<BackToSellStoreType>((set) => ({
	...initialBackToSellState,

	markVisitedSell: () =>
		set((state) => ({
			hasVisitedSell: true,
			showBackToSellButton: state.showBackToSellButton,
		})),

	setShowBackToSell: (show) =>
		set((state) => ({
			hasVisitedSell: state.hasVisitedSell,
			showBackToSellButton: show,
		})),

	finishSell: () =>
		set(() => ({
			completedSell: true,
			showBackToSellButton: false,
		})),

	resetBackToSell: () => set(() => initialBackToSellState),
}))

export function useBackToSellState() {
	const hasVisitedSell = useBackToSellStore((state) => state.hasVisitedSell)
	const completedSell = useBackToSellStore((state) => state.completedSell)
	const showBackToSellButton = useBackToSellStore((state) => state.showBackToSellButton)

	return { hasVisitedSell, showBackToSellButton, completedSell }
}

export function useBackToSellService() {
	const markVisitedSell = useBackToSellStore((state) => state.markVisitedSell)
	const setShowBackToSell = useBackToSellStore((state) => state.setShowBackToSell)
	const resetBackToSell = useBackToSellStore((state) => state.resetBackToSell)
	const finishSell = useBackToSellStore((state) => state.finishSell)

	return { markVisitedSell, setShowBackToSell, resetBackToSell, finishSell }
}
