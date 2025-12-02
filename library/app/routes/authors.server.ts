import { connectDB } from "../db";
import Author from "../models/author";

export interface AuthorData {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth: string | null;
  date_of_death: string | null;
  name: string;
  date_of_birth_formatted: string;
  date_of_death_formatted: string;
  lifespan: string;
  url: string;
}

export async function loadAuthors(): Promise<AuthorData[]> {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, querying authors...");

    const authors = await Author.find({}).exec();

    console.log(`Loaded ${authors.length} authors`);

    // Convert to plain objects with virtuals and serialized dates
    return authors.map((author: any) => {
      // Convert to object with getters to include virtuals
      const authorObj = author.toObject({ getters: true, virtuals: true });
      
      return {
        _id: authorObj._id.toString(),
        first_name: authorObj.first_name,
        family_name: authorObj.family_name,
        date_of_birth: author.date_of_birth
          ? new Date(author.date_of_birth).toISOString()
          : null,
        date_of_death: author.date_of_death
          ? new Date(author.date_of_death).toISOString()
          : null,
        name: authorObj.name || `${author.family_name}, ${author.first_name}`,
        date_of_birth_formatted: authorObj.date_of_birth_formatted || "",
        date_of_death_formatted: authorObj.date_of_death_formatted || "",
        lifespan: authorObj.lifespan || "unknown",
        url: authorObj.url || `/catalog/authors/${authorObj._id}`,
      };
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("loadAuthors error:", errorMessage, error);
    throw new Error(`Failed to load authors: ${errorMessage}`);
  }
}
