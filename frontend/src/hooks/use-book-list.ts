import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../actions/get-books";

interface UseBookListParams {
  page?: number;
  titleSearch?: string;
  authorSearch?: string;
  limit?: number;
}

export const useBookList = ({
  page = 1,
  titleSearch = "",
  authorSearch = "",
  limit = 10
}: UseBookListParams = {}) => {
  return useQuery({
    queryKey: ["books", page, titleSearch, authorSearch, limit],
    queryFn: async () => {
      const res = await getBooks(page, titleSearch, authorSearch, limit);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    staleTime: 5 * 60 * 1000
  });
};
