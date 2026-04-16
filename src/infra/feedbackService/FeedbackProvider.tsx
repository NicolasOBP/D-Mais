import { createContext, useContext } from "react";

import { IFeedbackService } from "./IFeedbackService";

export const FeedbackContext = createContext<IFeedbackService>(
  {} as IFeedbackService,
);

export const FeedbackProvider = FeedbackContext.Provider;

export function useFeedbackService(): IFeedbackService {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error(
      "Feedback Context should be used within a FeedbackProvider",
    );
  }

  return context;
}
