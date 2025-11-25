import { type MetaFunction } from "react-router";
import type { Route } from "./+types/catalog";

import { loadCatalogDetails, type CatalogDetails } from "./catalog.server";

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Library catalog overview with book and author statistics",
    },
  ];
};

export async function loader(): Promise<{ details: CatalogDetails }> {
  try {
    const details = await loadCatalogDetails();
    return { details };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Catalog loader error:", errorMessage, error);
    throw new Response(`Failed to load catalog data: ${errorMessage}`, {
      status: 500,
    });
  }
}

export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { details } = loaderData;

  return (
    <div>
      <div className="text-center">
        <h1>Book Lists</h1>
      </div>
      <p>The library has the following books:</p>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            Books: {details.numBooks}, Instances: {details.numBookInstances},
            Available: {details.numAvailableBookInstances}, Authors:{" "}
            {details.numAuthors}, Genres: {details.numGenres}
          </p>
        </div>
      </div>
    </div>
  );
}
