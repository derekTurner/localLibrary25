import { connectDB } from "../db";
import Book from "../models/book";
import Author from "../models/author";
import BookInstance from "../models/bookinstance";
import Genre from "../models/genre";

export interface CatalogDetails {
  numBooks: number;
  numBookInstances: number;
  numAvailableBookInstances: number;
  numAuthors: number;
  numGenres: number;
}

export async function loadCatalogDetails(): Promise<CatalogDetails> {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, querying collections...");

    const [
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres,
    ] = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);

    console.log("Catalog data loaded successfully");

    return {
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("loadCatalogDetails error:", errorMessage, error);
    throw new Error(`Database query failed: ${errorMessage}`);
  }
}
