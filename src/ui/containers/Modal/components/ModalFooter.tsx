import { useMemo } from "react";

import { isFormValid } from "@utils";

import { Box, Button } from "@core-components";

import { useModal } from "../useModal";

export type ModalFooterProps = {
  oneButtonFooter?: {
    onPress: () => void;
    disabled?: boolean;
    label: string;
  };

  twoButtonFooter?: {
    labelConfirm: string;
    labelCancel: string;
    onConfirm: () => void;
  };
};

export function ModalFooter({ ...modalFooterProps }: ModalFooterProps) {
  const { modalData } = useModal();

  const isDisabled = useMemo(() => {
    if (modalData?.formState) {
      return isFormValid(modalData.formState);
    }
    return modalFooterProps.oneButtonFooter?.disabled ?? false;
  }, [modalData.formState, modalFooterProps.oneButtonFooter?.disabled]);

  if (modalFooterProps.twoButtonFooter) {
    return <TwoButtonFooter {...modalFooterProps.twoButtonFooter} />;
  } else if (modalFooterProps.oneButtonFooter) {
    return (
      <OneButtonFooter
        {...modalFooterProps.oneButtonFooter}
        disabled={isDisabled}
      />
    );
  }
}

function TwoButtonFooter(props: ModalFooterProps["twoButtonFooter"]) {
  const { closeModal } = useModal();

  return (
    <Box alignItems="center" flexDirection="row" justifyContent="space-around">
      <Button
        variant="error"
        lable={props!.labelCancel}
        paddingVertical="s10"
        paddingHorizontal="s24"
        onPress={closeModal}
      />
      <Button
        variant="success"
        lable={props!.labelConfirm}
        paddingVertical="s10"
        paddingHorizontal="s24"
        onPress={props!.onConfirm}
      />
    </Box>
  );
}
function OneButtonFooter(props: ModalFooterProps["oneButtonFooter"]) {
  return (
    <Box alignItems="center">
      <Button
        variant="primary"
        lable={props!.label}
        paddingVertical="s10"
        paddingHorizontal="s24"
        onPress={props!.onPress}
        disabled={props!.disabled}
      />
    </Box>
  );
}
