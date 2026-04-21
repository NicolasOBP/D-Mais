import { create } from "zustand";

import { ModalFooterProps } from "./components/ModalFooter";

type Modal = {
  modal: {
    isModalOpen: boolean;
    headerTitle?: string;
    HeaderComponent?: React.ReactElement;
    FooterComponent?: React.ReactElement;
    BodyComponent: React.ReactElement | undefined;
    footerButton?: ModalFooterProps;
  };
};

const initialState: Modal = {
  modal: {
    isModalOpen: false,
    headerTitle: "",
    HeaderComponent: undefined,
    BodyComponent: undefined,
    FooterComponent: undefined,
    footerButton: undefined,
  },
};

type ShowModalParams = Omit<Modal["modal"], "isModalOpen">;

type ModalStore = typeof initialState & {
  showModal: (modal: ShowModalParams) => void;
  closeModal: () => void;
};

export const useModal = create<ModalStore>()((set) => ({
  ...initialState,
  closeModal: () => set(() => initialState),
  showModal: (modal) =>
    set(() => ({
      modal: { isModalOpen: true, ...modal },
    })),
}));
