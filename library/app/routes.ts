import type { RouteConfig } from "@react-router/dev/routes";
import {
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    route("catalog", "routes/catalog.tsx"),
    route("authors", "routes/authors.tsx"),
    route("genres", "routes/genres.tsx"),
    route("books", "routes/books.tsx"),
    route("instances", "routes/instances.tsx"),
  ]),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
