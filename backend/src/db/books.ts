import { drizzle } from "drizzle-orm/node-postgres";
import {
  type InferSelectModel,
  type InferInsertModel,
  eq,
  ilike,
  sql
} from "drizzle-orm";

import {
  pgTable,
  serial,
  varchar,
  date,
  text,
  integer,
  decimal,
  timestamp
} from "drizzle-orm/pg-core";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  isbn: varchar("isbn", { length: 13 }).unique(),
  publishedDate: date("published_date"),
  genre: varchar("genre", { length: 100 }),
  description: text("description"),
  language: varchar("language", { length: 50 }),
  pageCount: integer("page_count"),
  publisher: varchar("publisher", { length: 255 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  stockQuantity: integer("stock_quantity").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export type BookSelect = InferSelectModel<typeof books>;
export type BookInsert = InferInsertModel<typeof books>;

const dbConnectingString = process.env.DB;

const { Pool } = pg;

const pool = new Pool({
  connectionString: dbConnectingString,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.PEM_DB
  }
});

const db = drizzle(pool);

export const getBooks = async (
  page: number = 1,
  titleSearch?: string,
  authorSearch?: string,
  limit: number = 10
) => {
  let query = db.select().from(books).$dynamic();

  if (titleSearch) {
    query = query.where(ilike(books.title, `%${titleSearch}%`));
  }

  if (authorSearch) {
    query = query.where(ilike(books.author, `%${authorSearch}%`));
  }

  const offset = (page - 1) * limit;
  return await query.limit(limit).offset(offset);
};

export const getBookById = async (id: number) =>
  await db.select().from(books).where(eq(books.id, id)).limit(1);

export const getBookQuantity = async () => {
  const result = await db.select({ count: sql`count(*)` }).from(books);

  return result[0].count;
};

export const createBook = async (newBook: BookInsert) =>
  await db.insert(books).values(newBook).returning({
    id: books.id,
    title: books.title,
    desc: books.description,
    createDate: books.createdAt
  });

export const updateBookById = async (
  id: number,
  updatedBook: Partial<BookSelect>
) =>
  await db.update(books).set(updatedBook).where(eq(books.id, id)).returning({
    id: books.id,
    title: books.title,
    updatedDate: books.updatedAt
  });

export const deleteBookById = async (id: number) =>
  await db.delete(books).where(eq(books.id, id)).returning({
    id: books.id,
    title: books.title,
    desc: books.description
  });
