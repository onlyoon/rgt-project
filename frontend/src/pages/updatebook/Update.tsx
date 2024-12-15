import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteBook } from '@/hooks/use-delete-book';
import { useUpdateBook } from '@/hooks/use-update-book';
import { useBook } from '@/hooks/use-book';

// Zod schema for form validation
const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().length(13, 'ISBN must be exactly 13 digits').regex(/^\d+$/, 'ISBN must contain only numbers'),
  publishedDate: z.string().min(1, 'Published date is required'),
  genre: z.string().min(1, 'Genre is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  language: z.string().min(1, 'Language is required'),
  pageCount: z.coerce.number().int().positive('Page count must be a positive integer'),
  publisher: z.string().min(1, 'Publisher is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
});

type BookFormValues = z.infer<typeof bookSchema>;


const UpdateBook = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate()

  const deleteBookMutation = useDeleteBook();
  const updateBookMutation = useUpdateBook();

  const { data: book, isLoading, error } = useBook(+id!)

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      publishedDate: '',
      genre: '',
      description: '',
      language: '',
      pageCount: 0,
      publisher: '',
      price: '',
    },
  });

  useEffect(() => {
    if (book && book[0]) {
      const bookData = book[0];
      form.reset({
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        publishedDate: bookData.publishedDate,
        genre: bookData.genre,
        description: bookData.description,
        language: bookData.language,
        pageCount: bookData.pageCount,
        publisher: bookData.publisher,
        price: bookData.price.toString(),
      });
    }
  }, [book, form]);

  if (isLoading) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Update Book</h1>
        <MaxWidthWrapper>
          <span>loading...</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )
  if (error) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Update Book</h1>
        <MaxWidthWrapper>
          <span>Error: {error.message}</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )
  if (!book) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Update Book</h1>
        <MaxWidthWrapper>
          <span>Book not found</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )

  const onDeleteBook = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBookMutation.mutate(Number(id), {
        onSuccess: () => {
          navigate('/books');
        },
        onError: (error) => {
          console.error('Failed to delete book:', error);
        }
      });
    }
  }

  const onSubmit = (data: BookFormValues) => {
    updateBookMutation.mutate(
      { id: Number(id), bookData: data },
      {
        onSuccess: () => {
          navigate(`/books/${id}`);
        },
        onError: (error) => {
          console.error('Failed to update book:', error);
        },
      }
    );
  };

  return (
    <MaxWidthWrapper className='mt-4'>
      <h1 className="font-semibold text-2xl">Update Book</h1>
      <div className='rounded-xl border bg-card text-card-foreground shadow max-w-2xl mx-auto mt-8 p-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-4'>
              <Button
                variant={"destructive"}
                onClick={onDeleteBook}
                disabled={deleteBookMutation.isPending}
              >
                {deleteBookMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
  );
};

export default UpdateBook;