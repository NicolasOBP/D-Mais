import { useModalServiceZustand, useModalStoreZustand } from "./useModalStore";

export type { Modal, ShowModalParams } from "./useModalStore";

export function useModal(): ReturnType<typeof useModalStoreZustand> &
  ReturnType<typeof useModalServiceZustand> {
  const modalState = useModalStoreZustand();
  const modalService = useModalServiceZustand();

  return { ...modalState, ...modalService };
}
