import type { ShowModalParams } from "./useModal";

export const validateModalState = (modal: ShowModalParams): void => {
  // Check if both headerTitle and HeaderComponent are provided
  if (modal.headerTitle && modal.HeaderComponent) {
    throw new Error(
      "Cannot provide both 'headerTitle' and 'HeaderComponent' in modal state. Use only one.",
    );
  }

  // Check if both FooterComponent and footerButton are provided
  if (modal.FooterComponent && modal.footerButton) {
    throw new Error(
      "Cannot provide both 'FooterComponent' and 'footerButton' in modal state. Use only one.",
    );
  }
};
