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
  modalData?: any;
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
  modalData: undefined,
};

type ShowModalParams = Omit<Modal["modal"], "isModalOpen">;

type ModalStore = typeof initialState & {
  showModal: (modal: ShowModalParams, modalData?: any) => void;
  updateModalData: (modalData: any) => void;
  closeModal: () => void;
};

export const useModal = create<ModalStore>()((set) => ({
  ...initialState,
  closeModal: () => set(() => initialState),
  showModal: (modal, modalData) =>
    set(() => ({
      modal: { isModalOpen: true, ...modal },
      modalData,
    })),
  updateModalData: (modalData) =>
    set((state) => ({
      modalData,
    })),
}));
