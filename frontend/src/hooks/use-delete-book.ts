import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "@/actions/delete-book";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteBook(id);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      // 책 삭제 후 'books' 쿼리를 무효화하여 목록을 새로고침합니다.
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });
};
