import { createContext, useContext } from "react";

import { Repositories } from "@domain";

export const RepositoryContext = createContext<Repositories>(
  {} as Repositories,
);

export const RepositoryProvider = RepositoryContext.Provider;

export function useRepository(): Repositories {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error(
      "Repository Context should be used within a RepositoryProvider",
    );
  }

  return context;
}
