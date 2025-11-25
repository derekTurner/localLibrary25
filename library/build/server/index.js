import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, UNSAFE_withHydrateFallbackProps, Meta, ScrollRestoration, Scripts, NavLink, Link } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import dotenv from "dotenv";
import mongoose, { Schema, model } from "mongoose";
import { DateTime } from "luxon";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  return new Promise((resolve, reject) => {
    let shellError = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          resolve(
            new Response(stream, {
              status: shellError ? 500 : responseStatusCode,
              headers: responseHeaders
            })
          );
          pipe(body);
        },
        onShellError(error) {
          shellError = true;
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const appStylesHref = "/assets/app-BCbIxvWG.css";
const meta$3 = ({
  matches
}) => {
  const baseMeta = [{
    title: "Local Library"
  }, {
    property: "og:title",
    content: "Very cool app"
  }];
  const routeMeta = matches.flatMap((match) => match.meta || []);
  return [...baseMeta, ...routeMeta];
};
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "stylesheet",
        href: appStylesHref
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    id: "error-page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const HydrateFallback = UNSAFE_withHydrateFallbackProps(function HydrateFallback2() {
  return /* @__PURE__ */ jsxs("div", {
    id: "loading-splash",
    children: [/* @__PURE__ */ jsx("div", {
      id: "loading-splash-spinner"
    }), /* @__PURE__ */ jsx("p", {
      children: "Loading, please wait..."
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  HydrateFallback,
  Layout,
  default: root,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [{
    name: "description",
    content: "Access local library"
  }];
};
const sidebar = UNSAFE_withComponentProps(function SidebarLayout() {
  const navItems = [{
    path: "/",
    label: "Home"
  }, {
    path: "/catalog",
    label: "Catalog"
  }, {
    path: "/about",
    label: "About"
  }];
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      id: "sidebar",
      children: /* @__PURE__ */ jsx("div", {
        className: "container-md",
        children: /* @__PURE__ */ jsxs("div", {
          className: "row",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "col-3",
            children: [/* @__PURE__ */ jsx("h1", {
              children: "Local Library"
            }), /* @__PURE__ */ jsx("div", {
              className: "card",
              children: /* @__PURE__ */ jsx("div", {
                className: "card-body",
                children: /* @__PURE__ */ jsx("nav", {
                  children: /* @__PURE__ */ jsx("ul", {
                    className: "list-unstyled",
                    children: navItems.map((item) => /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx(NavLink, {
                        to: item.path,
                        className: ({
                          isActive,
                          isPending
                        }) => ["nav-link", isActive && "active", isPending && "pending"].filter(Boolean).join(" "),
                        children: item.label
                      })
                    }, item.path))
                  })
                })
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "col",
            children: [/* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      id: "detail",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sidebar,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [{
    name: "description",
    content: "Home page - Browse your local library"
  }];
};
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("p", {
    id: "index-page",
    children: ["This is a demo local library prohect for React Router.", /* @__PURE__ */ jsx("br", {}), "Check out", " ", /* @__PURE__ */ jsx("a", {
      href: "https://reactrouter.com",
      children: "the docs at reactrouter.com"
    }), "."]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
dotenv.config();
const connectionString = process.env.DB_STRING ?? "no connection string";
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(connectionString, {
      autoIndex: true
    });
    isConnected = true;
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date || null }
  }
);
AuthorSchema.set("toObject", { getters: true });
AuthorSchema.set("toJSON", { getters: true });
AuthorSchema.virtual("name").get(function() {
  return this.family_name + ", " + this.first_name;
});
AuthorSchema.virtual("date_of_birth_formatted").get(function() {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : "";
});
AuthorSchema.virtual("date_of_death_formatted").get(function() {
  if (this.date_of_death != null) {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : "";
  } else {
    return "living";
  }
});
AuthorSchema.virtual("lifespan").get(function() {
  if (this.date_of_death != null) {
    return "lifespan:" + (this.date_of_death.getFullYear() - this.date_of_birth.getFullYear()).toString() + " years";
  } else {
    return "living";
  }
});
AuthorSchema.virtual("url").get(function() {
  return "/catalog/authors/" + this._id;
});
const Author = model("Author", AuthorSchema);
const GenreSchema = new Schema(
  {
    name: { type: String, required: true }
  }
);
GenreSchema.set("toObject", { getters: true });
GenreSchema.set("toJSON", { getters: true });
GenreSchema.virtual("url").get(function() {
  return "/catalog/genres/" + this._id;
});
const Genre = model("Genre", GenreSchema);
const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "Author", required: true }],
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre", required: true }]
  }
);
BookSchema.set("toObject", { getters: true });
BookSchema.set("toJSON", { getters: true });
BookSchema.virtual("url").get(function() {
  return "/catalog/books/" + this._id;
});
const Book = model("Book", BookSchema);
const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    //reference to the associated book
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ["Available", "Maintenance", "Loaned", "Reserved"], default: "Maintenance" },
    due_back: { type: Date, default: Date.now }
  }
);
BookInstanceSchema.set("toObject", { getters: true });
BookInstanceSchema.set("toJSON", { getters: true });
BookInstanceSchema.virtual("url").get(function() {
  return "/catalog/instances/" + this._id;
});
BookInstanceSchema.virtual("due_back_formatted").get(function() {
  if (this.due_back != null) {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
  } else {
    return "In Library";
  }
});
const BookInstance = model("BookInstance", BookInstanceSchema);
async function loadCatalogDetails() {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, querying collections...");
    const [
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres
    ] = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec()
    ]);
    console.log("Catalog data loaded successfully");
    return {
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("loadCatalogDetails error:", errorMessage, error);
    throw new Error(`Database query failed: ${errorMessage}`);
  }
}
const meta = () => {
  return [{
    name: "description",
    content: "Library catalog overview with book and author statistics"
  }];
};
async function loader() {
  try {
    const details = await loadCatalogDetails();
    return {
      details
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Catalog loader error:", errorMessage, error);
    throw new Response(`Failed to load catalog data: ${errorMessage}`, {
      status: 500
    });
  }
}
const catalog = UNSAFE_withComponentProps(function Catalog({
  loaderData
}) {
  const {
    details
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      className: "text-center",
      children: /* @__PURE__ */ jsx("h1", {
        children: "Book Lists"
      })
    }), /* @__PURE__ */ jsx("p", {
      children: "The library has the following books:"
    }), /* @__PURE__ */ jsx("div", {
      className: "card",
      children: /* @__PURE__ */ jsx("div", {
        className: "card-body",
        children: /* @__PURE__ */ jsxs("p", {
          className: "card-text",
          children: ["Books: ", details.numBooks, ", Instances: ", details.numBookInstances, ", Available: ", details.numAvailableBookInstances, ", Authors:", " ", details.numAuthors, ", Genres: ", details.numGenres]
        })
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: catalog,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    id: "about",
    children: [/* @__PURE__ */ jsx(Link, {
      to: "/",
      children: "← Go to demo"
    }), /* @__PURE__ */ jsx("h1", {
      children: "About React Router Contacts"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("p", {
        children: "This is a demo application showing off some of the powerful features of React Router, including dynamic routing, nested routes, loaders, actions, and more."
      }), /* @__PURE__ */ jsx("h2", {
        children: "Features"
      }), /* @__PURE__ */ jsx("p", {
        children: "Explore the demo to see how React Router handles:"
      }), /* @__PURE__ */ jsxs("ul", {
        children: [/* @__PURE__ */ jsx("li", {
          children: "Data loading and mutations with loaders and actions"
        }), /* @__PURE__ */ jsx("li", {
          children: "Nested routing with parent/child relationships"
        }), /* @__PURE__ */ jsx("li", {
          children: "URL-based routing with dynamic segments"
        }), /* @__PURE__ */ jsx("li", {
          children: "Pending and optimistic UI"
        })]
      }), /* @__PURE__ */ jsx("h2", {
        children: "Learn More"
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Check out the official documentation at", " ", /* @__PURE__ */ jsx("a", {
          href: "https://reactrouter.com",
          children: "reactrouter.com"
        }), " ", "to learn more about building great web applications with React Router."]
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DXbyBwmI.js", "imports": ["/assets/chunk-UIGDSWPH-4eg3cZrl.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BnpWIQV4.js", "imports": ["/assets/chunk-UIGDSWPH-4eg3cZrl.js"], "css": ["/assets/app-BCbIxvWG.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "layouts/sidebar": { "id": "layouts/sidebar", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sidebar-t_HnRYS7.js", "imports": ["/assets/chunk-UIGDSWPH-4eg3cZrl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "layouts/sidebar", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-FIDsauvH.js", "imports": ["/assets/chunk-UIGDSWPH-4eg3cZrl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/catalog": { "id": "routes/catalog", "parentId": "layouts/sidebar", "path": "catalog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/catalog-GE70LHTf.js", "imports": ["/assets/chunk-UIGDSWPH-4eg3cZrl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-DZJpSOzM.js", "imports": ["/assets/chunk-UIGDSWPH-4eg3cZrl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a3f38b10.js", "version": "a3f38b10", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/about"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "layouts/sidebar": {
    id: "layouts/sidebar",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "layouts/sidebar",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/catalog": {
    id: "routes/catalog",
    parentId: "layouts/sidebar",
    path: "catalog",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
