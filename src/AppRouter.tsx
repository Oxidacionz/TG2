import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => <div>Hello World</div>,
    // loader: loadRootData,
  },
];

export const router = createBrowserRouter(routes);
