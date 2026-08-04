import { create } from "zustand";

import { ModalFooterProps } from "./components/ModalFooter";

export type Modal = {
  modal: {
    isModalOpen: boolean;
    headerTitle?: string;
    headerSubtitle?: string;
    HeaderComponent?: React.ReactElement;
    FooterComponent?: React.ReactElement;
    BodyComponent: React.ReactElement | undefined;
    footerButton?: ModalFooterProps;
  };
  modalData?: any;
};

export const initialModalState: Modal = {
  modal: {
    isModalOpen: false,
    headerTitle: "",
    headerSubtitle: "",
    HeaderComponent: undefined,
    BodyComponent: undefined,
    FooterComponent: undefined,
    footerButton: undefined,
  },
  modalData: undefined,
};

export type ShowModalParams = Omit<Modal["modal"], "isModalOpen">;

export type ModalStoreType = typeof initialModalState & {
  showModal: (modal: ShowModalParams, modalData?: any) => void;
  updateModalData: (modalData: any) => void;
  closeModal: () => void;
};

const useModalStoreBase = create<ModalStoreType>()((set) => ({
  ...initialModalState,
  closeModal: () => set(() => initialModalState),
  showModal: (modal, modalData) =>
    set(() => ({
      modal: { isModalOpen: true, ...modal },
      modalData,
    })),
  updateModalData: (modalData) =>
    set((state) => ({
      modalData: { ...state.modalData, ...modalData },
    })),
}));

export function useModalStoreZustand(): Pick<
  ModalStoreType,
  "modal" | "modalData"
> {
  const modal = useModalStoreBase((state) => state.modal);
  const modalData = useModalStoreBase((state) => state.modalData);

  return { modal, modalData };
}

export function useModalServiceZustand(): Omit<
  ModalStoreType,
  "modal" | "modalData"
> {
  const showModal = useModalStoreBase((state) => state.showModal);
  const updateModalData = useModalStoreBase((state) => state.updateModalData);
  const closeModal = useModalStoreBase((state) => state.closeModal);

  return { showModal, updateModalData, closeModal };
}

export { useModalStoreBase as useModalStore };
