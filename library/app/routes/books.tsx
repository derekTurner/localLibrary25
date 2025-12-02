import { type MetaFunction, Link } from "react-router";
import type { Route } from "./+types/books";

import { loadBooks, type BookData } from "./books.server";

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Browse all books in the library catalog",
    },
  ];
};

export async function loader(): Promise<{ books: BookData[] }> {
  try {
    const books = await loadBooks();
    return { books };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Books loader error:", errorMessage, error);
    throw new Response(`Failed to load books: ${errorMessage}`, {
      status: 500,
    });
  }
}

export default function Books({ loaderData }: Route.ComponentProps) {
  const { books } = loaderData as { books: BookData[] };

  return (
    <div>
      <div className="text-center">
        <h1>Books List</h1>
      </div>

      <div className="card" style={{ maxWidth: "80em", margin: "0 auto" }}>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {books.length > 0 ? (
              books.map((book: BookData) => (
                <li
                  className="list-group-item"
                  key={book._id}
                  style={{ padding: "1rem" }}
                >
                  <div>
                    <strong>{book.title}</strong>
                  </div>
                  <div className="text-muted small">
                    <div>
                      Authors:{" "}
                      {book.authors
                        .map((author) => author.name)
                        .join(", ") || "Unknown"}
                    </div>
                    <div>ISBN: {book.isbn}</div>
                    <div>
                      Genres:{" "}
                      {book.genres.map((genre) => genre.name).join(", ") ||
                        "Unclassified"}
                    </div>
                    <div className="mt-2">{book.summary}</div>
                  </div>
                  <Link
                    to={book.url}
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Details
                  </Link>
                </li>
              ))
            ) : (
              <div className="alert alert-info">No books found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
