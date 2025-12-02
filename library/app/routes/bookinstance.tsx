import { type MetaFunction, Link } from "react-router";
import type { Route } from "./+types/bookinstance";

import { loadBookInstances, type BookInstanceData } from "./bookinstance.server";

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Browse all book instances in the library catalog",
    },
  ];
};

export async function loader(): Promise<{ bookInstances: BookInstanceData[] }> {
  try {
    const bookInstances = await loadBookInstances();
    return { bookInstances };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("BookInstance loader error:", errorMessage, error);
    throw new Response(`Failed to load book instances: ${errorMessage}`, {
      status: 500,
    });
  }
}

export default function BookInstances({
  loaderData,
}: Route.ComponentProps) {
  const { bookInstances } = loaderData as {
    bookInstances: BookInstanceData[];
  };

  return (
    <div>
      <div className="text-center">
        <h1>Book Instances</h1>
      </div>

      <div className="card" style={{ maxWidth: "80em", margin: "0 auto" }}>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {bookInstances.length > 0 ? (
              bookInstances.map((instance: BookInstanceData) => (
                <li
                  className="list-group-item"
                  key={instance._id}
                  style={{ padding: "1rem" }}
                >
                  <div>
                    <strong>{instance.book.title}</strong>
                  </div>
                  <div className="text-muted small">
                    <div>Imprint: {instance.imprint}</div>
                    <div>
                      Status:{" "}
                      <span
                        className={`badge ${
                          instance.status === "Available"
                            ? "bg-success"
                            : instance.status === "Loaned"
                              ? "bg-warning"
                              : instance.status === "Reserved"
                                ? "bg-info"
                                : "bg-secondary"
                        }`}
                      >
                        {instance.status}
                      </span>
                    </div>
                    <div>Due Back: {instance.due_back_formatted}</div>
                  </div>
                  <Link
                    to={instance.url}
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Details
                  </Link>
                </li>
              ))
            ) : (
              <div className="alert alert-info">
                No book instances found
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
