import {
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    type MetaFunction,
} from "react-router";

import type { Route } from "./+types/root";

import appStylesHref from "./app.css?url";
import "./app.css"; // includes bootstrap

export const meta: MetaFunction = ({ matches }) => {
    // Get base metadata for all pages
    const baseMeta = [
        { title: "Local Library" },
        {
            property: "og:title",
            content: "Very cool app",
        },
    ];

    // Merge with any route-specific metadata from child routes/layouts
    const routeMeta = matches.flatMap((match) => match.meta || []);

    return [...baseMeta, ...routeMeta];
};

export default function App() {
    return <Outlet />;
}

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export
export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href={appStylesHref} />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main id="error-page">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}

export function HydrateFallback() {
    return (
        <div id="loading-splash">
            <div id="loading-splash-spinner" />
            <p>Loading, please wait...</p>
        </div>
    );
}