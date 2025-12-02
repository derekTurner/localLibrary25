import { type MetaFunction, Link } from "react-router";
import type { Route } from "./+types/genres";

import { loadGenres, type GenreData } from "./genres.server";

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Books in the collection include these genres",
    },
  ];
};

export async function loader(): Promise<{ genres: GenreData[] }> {
  try { 
    const genres = await loadGenres();
    return { genres };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Genres loader error:", errorMessage, error);
    throw new Response(`Failed to load genres: ${errorMessage}`, {
      status: 500,
    });
  }
}

export default function Genres({ loaderData }: Route.ComponentProps) {
  const { genres } = loaderData as { genres: GenreData[] };

  return (
    <div>
      <div className="text-center">
        <h1>Genre List</h1>
      </div>

      <div className="card" style={{ maxWidth: "60em", margin: "0 auto" }}>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {genres.length > 0 ? (
              genres.map((genres: GenreData) => (
                <li
                  className="list-group-item"
                  key={genres._id}
                  style={{ padding: "1rem" }}
                >
                  <div>
                    <strong>{genres.name}</strong>
                  </div>
                  <Link
                    to={genres.url}
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Details
                  </Link>
                </li>
              ))
            ) : (
              <div className="alert alert-info">No genres found</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
