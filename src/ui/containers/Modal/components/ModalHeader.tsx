import { Box, Text } from "@core-components";

import { Icon } from "@components";

import { useModal } from "../useModal";

type Props = {
  title: string;
};

export function ModalHeader({ title }: Props) {
  const { closeModal } = useModal();

  return (
    <Box alignItems="center" justifyContent="space-between" flexDirection="row">
      <Box />
      <Box>
        <Text variant="title20">{title}</Text>
      </Box>
      <Box>
        <Icon name="close" color="primary" onPress={closeModal} />
      </Box>
    </Box>
  );
}
