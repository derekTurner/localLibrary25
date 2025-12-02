import { type MetaFunction, Link } from "react-router";
import type { Route } from "./+types/authors";

import { loadAuthors, type AuthorData } from "./authors.server";

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Browse all authors in the library catalog",
    },
  ];
};

export async function loader(): Promise<{ authors: AuthorData[] }> {
  try {
    const authors = await loadAuthors();
    return { authors };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Authors loader error:", errorMessage, error);
    throw new Response(`Failed to load authors: ${errorMessage}`, {
      status: 500,
    });
  }
}

export default function Authors({ loaderData }: Route.ComponentProps) {
  const { authors } = loaderData as { authors: AuthorData[] };

  return (
    <div>
      <div className="text-center">
        <h1>Author List</h1>
      </div>

      <div className="card" style={{ maxWidth: "60em", margin: "0 auto" }}>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {authors.length > 0 ? (
              authors.map((author: AuthorData) => (
                <li
                  className="list-group-item"
                  key={author._id}
                  style={{ padding: "1rem" }}
                >
                  <div>
                    <strong>{author.name}</strong>
                  </div>
                  <div className="text-muted small">
                    <div>Born: {author.date_of_birth_formatted}</div>
                    <div>Died: {author.date_of_death_formatted}</div>
                    <div>{author.lifespan}</div>
                  </div>
                  <Link
                    to={author.url}
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Details
                  </Link>
                </li>
              ))
            ) : (
              <div className="alert alert-info">No authors found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
