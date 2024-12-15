import { useBook } from "@/hooks/use-book"
import { Link, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const BookDetail = () => {
  const { id } = useParams()
  const { data: book, isLoading, error } = useBook(+id!)
  if (isLoading) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Book Detail</h1>
        <MaxWidthWrapper>
          <span>loading...</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )
  if (error) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Book Detail</h1>
        <MaxWidthWrapper>
          <span>Error: {error.message}</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )
  if (!book) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Book Detail</h1>
        <MaxWidthWrapper>
          <span>Book not found</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )


  const bookData = book[0]

  console.log(bookData)

  return (
    <MaxWidthWrapper className="mt-4">
      <h1 className="font-semibold text-2xl">Book Detail</h1>
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>{bookData.title}</CardTitle>
          <CardDescription>by {bookData.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <Badge>{bookData.genre}</Badge>
              <span className="text-sm text-muted-foreground">Published: {new Date(bookData.publishedDate).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">{bookData.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>ISBN:</strong> {bookData.isbn}
              </div>
              <div>
                <strong>Language:</strong> {bookData.language}
              </div>
              <div>
                <strong>Stock Quantity:</strong> {bookData.pageCount}
              </div>
              <div>
                <strong>Publisher:</strong> {bookData.publisher}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold">${bookData.price}</span>
              <div className="flex gap-4" >
                <Link to={`/books/${id}/update`}>
                  <Button>Update</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}

export default BookDetail