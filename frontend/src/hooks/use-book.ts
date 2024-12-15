import { useQuery } from "@tanstack/react-query";
import { getBook } from "@/actions/get-book";

export const useBook = (id: number) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await getBook(id);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    }
  });
};
