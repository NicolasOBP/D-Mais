import { useAppTheme } from "@theme";

import { ProgressBar } from "@components";
import { Box, Text } from "@core-components";

type SendSellModalBodyProps = {
  userLeftQuota?: number;
  userQuota?: number;
};

export function SendSellModalBody({
  userLeftQuota,
  userQuota,
}: SendSellModalBodyProps) {
  const { spacing } = useAppTheme();

  return (
    <Box gap="s12">
      <Box>
        <ProgressBar
          total={userQuota ?? 0}
          remaining={userLeftQuota ?? 0}
          label={`Quota restante: ${userLeftQuota ?? 0} L`}
          height={18}
          style={{ marginTop: -spacing.s20 }}
        />
      </Box>

      <Box>
        <Text textAlign="center" variant="title14">
          Deseja realmente enviar a venda para a distribuidora?
        </Text>
        <Text textAlign="center" variant="title14">
          Ela entrará como pendente
        </Text>
      </Box>
    </Box>
  );
}
