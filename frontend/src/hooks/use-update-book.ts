import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putBook } from "@/actions/put-book";

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

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, bookData }: { id: number; bookData: BookData }) =>
      putBook(id, bookData),
    onSuccess: (data, variables) => {
      data;
      queryClient.invalidateQueries({ queryKey: ["book", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });
};
