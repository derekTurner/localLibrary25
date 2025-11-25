import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Home page - Browse your local library",
    },
  ];
};

export default function Home() {
  return (
    <p id="index-page">
      This is a demo local library prohect for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">
        the docs at reactrouter.com
      </a>
      .
    </p>
  );
}
