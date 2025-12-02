import {
  NavLink,
  Outlet,
  ScrollRestoration,
  Scripts,
  type MetaFunction,
} from "react-router";

interface NavItem {
  path: string;
  label: string;
}

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Access local library",
    },
  ];
};

export default function SidebarLayout() {
  const navItems: NavItem[] = [
    { path: "/", label: "Home" },
    { path: "/catalog", label: "Catalog" },
    { path: "/authors", label: "Authors" },
    { path: "/genres", label: "Genres" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      <div id="sidebar">
        <div className="container-md">
          <div className="row">
            <div className="col-3">
              <h1>Local Library</h1>
              <div className="card">
                <div className="card-body">
                  <nav>
                    <ul className="list-unstyled">
                      {navItems.map((item) => (
                        <li key={item.path}>
                          <NavLink
                            to={item.path}
                            className={({ isActive, isPending }) =>
                              [
                                "nav-link",
                                isActive && "active",
                                isPending && "pending",
                              ]
                                .filter(Boolean)
                                .join(" ")
                            }
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col">
              <ScrollRestoration />
              <Scripts />
            </div>
          </div>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
