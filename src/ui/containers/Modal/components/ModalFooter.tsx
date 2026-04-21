import { useMemo } from "react";

import { Box, Button } from "@core-components";
import { isFormValid } from "@utils";

import { useModal } from "../useModal";

export type ModalFooterProps = {
  onPress: () => void;
  disabled?: boolean;
  label: string;
};

export function ModalFooter({
  onPress,
  disabled: initialDisabled,
  label,
}: ModalFooterProps) {
  const { modalData } = useModal();

  const isDisabled = useMemo(() => {
    if (modalData?.formState) {
      return isFormValid(modalData.formState);
    }
    return initialDisabled ?? false;
  }, [modalData.formState, initialDisabled]);

  return (
    <Box alignItems="center">
      <Button
        variant="primary"
        lable={label}
        paddingVertical="s10"
        paddingHorizontal="s24"
        onPress={onPress}
        disabled={isDisabled}
      />
    </Box>
  );
}
