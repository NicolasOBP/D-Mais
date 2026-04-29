import { Icon } from "@components";
import { Box, Text } from "@core-components";

import { useModal } from "../useModal";

type Props = {
  title?: string;
};

export function ModalHeader({ title }: Props) {
  const { closeModal, modalData } = useModal();

  function handleClose() {
    modalData?.reset?.();
    closeModal();
  }

  return (
    <Box alignItems="center" justifyContent="space-between" flexDirection="row">
      <Box />
      <Box>
        <Text variant="title20">{title}</Text>
      </Box>
      <Box>
        <Icon name="close" color="primary" onPress={handleClose} />
      </Box>
    </Box>
  );
}
