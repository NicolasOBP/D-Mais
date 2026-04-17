import { create } from "zustand";

const initialState = { isModalOpen: false };

type ModalStore = typeof initialState & {
  showModal: () => void;
  closeModal: () => void;
};

export const useModal = create<ModalStore>()((set) => ({
  ...initialState,
  closeModal: () => set((modal) => ({ isModalOpen: false })),
  showModal: () => set((modal) => ({ isModalOpen: true })),
}));
