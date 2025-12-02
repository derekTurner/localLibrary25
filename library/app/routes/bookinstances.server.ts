import { connectDB } from "../db";
import BookInstance from "../models/bookinstance";

export interface BookInstanceData {
  _id: string;
  book: {
    _id: string;
    title: string;
  };
  imprint: string;
  status: "Available" | "Maintenance" | "Loaned" | "Reserved";
  due_back: string | null;
  due_back_formatted: string;
  url: string;
}

export async function loadBookInstances(): Promise<BookInstanceData[]> {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, querying book instances...");

    const bookInstances = await BookInstance.find({})
      .populate("book")
      .exec();

    console.log(`Loaded ${bookInstances.length} book instances`);

    // Convert to plain objects with virtuals
    return bookInstances.map((instance: any) => {
      // Convert to object with getters to include virtuals
      const instanceObj = instance.toObject({
        getters: true,
        virtuals: true,
      });

      return {
        _id: instanceObj._id.toString(),
        book: {
          _id: instanceObj.book._id.toString(),
          title: instanceObj.book.title,
        },
        imprint: instanceObj.imprint,
        status: instanceObj.status,
        due_back: instance.due_back
          ? new Date(instance.due_back).toISOString()
          : null,
        due_back_formatted:
          instanceObj.due_back_formatted || "In Library",
        url: instanceObj.url || `/catalog/instances/${instanceObj._id}`,
      };
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("loadBookInstances error:", errorMessage, error);
    throw new Error(`Failed to load book instances: ${errorMessage}`);
  }
}
