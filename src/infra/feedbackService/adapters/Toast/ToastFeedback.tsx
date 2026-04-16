import { Box, Text } from "@core-components";

import { IFeedbackService } from "../../IFeedbackService";

export const ToastFeedback: IFeedbackService = {
  send: (feedback) => {
    console.log({ feedback });

    return (
      <Box
        position="absolute"
        width={200}
        height={200}
        backgroundColor="backgroundContrast"
        zIndex={50}
      >
        <Text>{feedback.message}</Text>
      </Box>
    );
  },
};
