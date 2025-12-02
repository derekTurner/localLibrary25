import { connectDB } from "../db";
import Book from "../models/book";

export interface BookData {
  _id: string;
  title: string;
  authors: Array<{
    _id: string;
    first_name: string;
    family_name: string;
    name: string;
  }>;
  summary: string;
  isbn: string;
  genres: Array<{
    _id: string;
    name: string;
  }>;
  url: string;
}

export async function loadBooks(): Promise<BookData[]> {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, querying books...");

    const books = await Book.find({})
      .populate("authors")
      .populate("genres")
      .exec();

    console.log(`Loaded ${books.length} books`);

    // Convert to plain objects with virtuals
    return books.map((book: any) => {
      // Convert to object with getters to include virtuals
      const bookObj = book.toObject({
        getters: true,
        virtuals: true,
      });

      return {
        _id: bookObj._id.toString(),
        title: bookObj.title,
        authors: (bookObj.authors || []).map((author: any) => ({
          _id: author._id.toString(),
          first_name: author.first_name,
          family_name: author.family_name,
          name: author.name || `${author.family_name}, ${author.first_name}`,
        })),
        summary: bookObj.summary,
        isbn: bookObj.isbn,
        genres: (bookObj.genres || []).map((genre: any) => ({
          _id: genre._id.toString(),
          name: genre.name,
        })),
        url: bookObj.url || `/catalog/books/${bookObj._id}`,
      };
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("loadBooks error:", errorMessage, error);
    throw new Error(`Failed to load books: ${errorMessage}`);
  }
}
