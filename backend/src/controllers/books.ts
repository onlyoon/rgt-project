import type { Context } from "hono";
import {
  getBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  type BookInsert,
  type BookSelect,
  getBookQuantity
} from "../db/books.js";

export const getBooksList = async (c: Context) => {
  try {
    const page = +(c.req.query("page") || "1");
    const titleSearch = c.req.query("title");
    const authorSearch = c.req.query("author");

    const books = await getBooks(page, titleSearch, authorSearch);
    const totalCount = await getBookQuantity();

    if (books.length === 0) {
      return c.json({ message: "no result", data: [] }, 200);
    }

    return c.json(
      {
        data: books,
        count: totalCount,
        page: page
      },
      200
    );
  } catch (e) {
    console.error(e);
    return c.json({ error: "error from get Book List" }, 400);
  }
};

export const getBookInfo = async (c: Context) => {
  try {
    const bookId = +c.req.param("id");

    const bookInfo = await getBookById(bookId);

    return c.json(bookInfo, 200);
  } catch (e) {
    console.error(e);
    return c.json({ error: "error from get Book Info" }, 400);
  }
};

export const addBook = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newBook: BookInsert = {
      title: body.title,
      author: body.author,
      isbn: body.isbn,
      publishedDate: body.publishedDate,
      genre: body.genre,
      description: body.description,
      language: body.language,
      pageCount: body.pageCount,
      publisher: body.publisher,
      price: body.price
    };

    const createdBook = await createBook(newBook);

    return c.json(
      {
        message: "Book Added Successfully",
        book: createdBook
      },
      201
    );
  } catch (e) {
    console.error(e);
    return c.json({ error: "error from add book" }, 500);
  }
};

export const updateBook = async (c: Context) => {
  try {
    const id = +c.req.param("id");
    const body = await c.req.json();
    const updatedBook: Partial<BookSelect> = {
      title: body.title,
      author: body.author,
      isbn: body.isbn,
      publishedDate: body.publishedDate,
      genre: body.genre,
      description: body.description,
      language: body.language,
      pageCount: body.pageCount,
      publisher: body.publisher,
      price: body.price
    };

    const result = await updateBookById(id, updatedBook);

    if (result.length === 0) {
      return c.json({ error: "No Result" }, 404);
    }
    return c.json(
      {
        message: "Book Updated Successfully",
        book: result[0]
      },
      200
    );
  } catch (e) {
    console.error(e);
    return c.json({ error: "Error while Update Book" }, 500);
  }
};

export const deleteBook = async (c: Context) => {
  try {
    const bookId = +c.req.param("id");
    const deleteBook = await deleteBookById(bookId);
    return c.json(
      {
        message: "Book Deleted Successfully",
        book: deleteBook
      },
      200
    );
  } catch (e) {
    console.error(e);
    return c.json({ error: "error from delete Book" }, 400);
  }
};
