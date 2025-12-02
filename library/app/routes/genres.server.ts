import { connectDB } from "../db";
import Genre from "../models/genre";

export interface GenreData {
  _id: string;
  name: string;
  url: string;
}

export async function loadGenres(): Promise<GenreData[]> {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, querying genres...");

    const genres = await Genre.find({}).sort([["name", "ascending"]]).exec();

    console.log(`Loaded ${genres.length} genres`);

    // Convert to plain objects with virtuals and serialized dates
    return genres.map((genre: any) => {
      // Convert to object with getters to include virtuals
      const genreObj = genre.toObject({
        getters: true,
        virtuals: true,
      });

      return {
        _id: genreObj._id.toString(),
        name: genreObj.name,
        url:
          genreObj.url || `/catalog/genres/${genreObj._id}`,
      };
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("loadGenres error:", errorMessage, error);
    throw new Error(`Failed to load genres: ${errorMessage}`);
  }
}
