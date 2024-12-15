import { QueryClient, QueryCache } from "@tanstack/react-query";

export const defaultStaleTime = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultStaleTime
      }
    },
    queryCache: new QueryCache({})
  });
}

export const queryClient = makeQueryClient();
