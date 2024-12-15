import { Hono } from "hono";
import {
  getBooksList,
  getBookInfo,
  deleteBook,
  addBook,
  updateBook
} from "../controllers/books.js";

const router = new Hono();

router.get("/books", getBooksList);
router.get("/books/:id", getBookInfo);
router.post("/books", addBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
