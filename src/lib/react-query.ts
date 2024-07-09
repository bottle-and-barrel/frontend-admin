import { QueryClientConfig } from "@tanstack/react-query";

export const clientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      throwOnError(error, query) {
        if (error instanceof Error) {
          if (error.message === "NEXT_REDIRECT") return true;
        }
        return false;
      },
    },
  },
} satisfies QueryClientConfig;
