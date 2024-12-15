import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "@/actions/post-book";

interface BookData {
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  genre: string;
  description: string;
  language: string;
  pageCount: number;
  publisher: string;
  price: string;
}

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData: BookData) => postBook(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });
};
