import { Box, Text } from "@core-components";

import { Icon } from "../../Icon";
import { useModal } from "../useModal";

type Props = {
  title?: string;
  subtitle?: string;
};

export function ModalHeader({ title, subtitle }: Props) {
  const { closeModal, modalData } = useModal();

  function handleClose() {
    modalData?.reset?.();
    closeModal();
  }

  return (
    <Box alignItems="center" justifyContent="space-between" flexDirection="row">
      <Box />
      <Box>
        <Text variant="title20" textAlign="center">
          {title}
        </Text>
        {subtitle && (
          <Text variant="title16" textAlign="center">
            {subtitle}
          </Text>
        )}
      </Box>
      <Box>
        <Icon name="close" color="primary" onPress={handleClose} />
      </Box>
    </Box>
  );
}
