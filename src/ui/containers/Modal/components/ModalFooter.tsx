import { Box, Button } from "@core-components";

export type ModalFooterProps = {
  onPress: () => void;
  disabled?: boolean;
  label: string;
};

export function ModalFooter({ onPress, disabled, label }: ModalFooterProps) {
  return (
    <Box alignItems="center">
      <Button
        variant="primary"
        lable={label}
        paddingVertical="s10"
        paddingHorizontal="s24"
        onPress={onPress}
        disabled={disabled}
      />
    </Box>
  );
}
