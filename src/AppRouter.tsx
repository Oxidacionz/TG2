import { createBrowserRouter, redirect, RouteObject } from "react-router";

import { Spinner } from "@core/feedback/Spinner";
import { authService } from "@features/auth/services/AuthService";

import { DashboardLayout } from "./layouts/DashboardLayout";

const protectedLoader = async () => {
  const { session } = await authService.getSession();

  if (!session) throw redirect("/login");

  return { session };
};

const publicLoader = async () => {
  const { session } = await authService.getSession();

  if (session) throw redirect("/");

  return null;
};

const Fallback = (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
    <Spinner size="lg" />
  </div>
);

const routes: RouteObject[] = [
  {
    path: "/login",
    lazy: () =>
      import("@features/auth/pages/LoginPage").then((m) => ({
        Component: m.default,
      })),
    loader: publicLoader,
    hydrateFallbackElement: Fallback,
  },
  {
    path: "/",
    Component: DashboardLayout,
    loader: protectedLoader,
    hydrateFallbackElement: Fallback,
    children: [
      {
        index: true,
        lazy: () =>
          import("@features/dashboard/pages/DashboardPage").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "transactions",
        lazy: () =>
          import("@features/transactions/pages/TransactionsPage").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "accounts",
        lazy: () =>
          import("./pages/TreasuryPage").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
