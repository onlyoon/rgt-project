import { useState } from "react"

import { useBookList } from "@/hooks/use-book-list"
import BookCard from "./components/BookCard"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
// import BookListPagenation from "@/components/BookListPagenation"
import SearchBar from "@/components/SearchBar"

interface BookData {
  id: number;
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
  updatedAt: string;
}


const BookList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useBookList({ page: currentPage, titleSearch: searchTerm });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <MaxWidthWrapper>
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="font-semibold text-2xl">Book List</h1>
          <MaxWidthWrapper>
            <span>loading...</span>
          </MaxWidthWrapper>
        </div>
      </MaxWidthWrapper>
    )

  if (error) return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Book List</h1>
        <MaxWidthWrapper>
          <span>Error: {error.message}</span>
        </MaxWidthWrapper>
      </div>
    </MaxWidthWrapper>
  )

  if (!data && !isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="font-semibold text-2xl">Book List</h1>
          <MaxWidthWrapper>
            <span>검색 결과가 없습니다.</span>
          </MaxWidthWrapper>
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="font-semibold text-2xl">Book List</h1>
          <MaxWidthWrapper>

            <SearchBar onSearch={handleSearch} />
          </MaxWidthWrapper>

          {data.data.map((book: BookData) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              desc={book.description}
              publisher={book.publisher}
              price={book.price}
              updatedAt={book.updatedAt}
            />
          ))}
          <div className="pb-8">
            {/* <BookListPagenation count={count} /> */}
          </div>
          <MaxWidthWrapper>
            {isLoading && <div>Loading...</div>}
          </MaxWidthWrapper>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default BookList