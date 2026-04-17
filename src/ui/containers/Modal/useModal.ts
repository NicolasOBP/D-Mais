import { create } from "zustand";

const initialState = { modal: { isModalOpen: false, title: "" } };

type showModalParams = Omit<(typeof initialState)["modal"], "isModalOpen">;

type ModalStore = typeof initialState & {
  showModal: ({ title }: showModalParams) => void;
  closeModal: () => void;
  reset: () => void;
};

export const useModal = create<ModalStore>()((set) => ({
  ...initialState,
  closeModal: () =>
    set((prev) => ({ modal: { ...prev.modal, isModalOpen: false } })),
  showModal: ({ title }) =>
    set(() => ({ modal: { isModalOpen: true, title } })),
  reset: () => set(() => initialState),
}));
