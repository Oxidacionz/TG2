import { createBrowserRouter, redirect, RouteObject } from "react-router";
import { authService } from "@features/auth/services/AuthService";
import { DashboardLayout } from "./layouts/DashboardLayout";

import { Spinner } from "@core/feedback/Spinner";

// --- LÓGICA DE PROTECCIÓN ---

// Protege el Dashboard
const protectedLoader = async () => {
  const { session } = await authService.getSession();

  if (!session) throw redirect("/login");

  return { session };
};

// Evita ver el Login si ya entraste
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

// --- DEFINICIÓN DE RUTAS ---

const routes: RouteObject[] = [
  {
    path: "/login",
    lazy: () =>
      import("@features/auth/pages/LoginPage").then((m) => ({
        Component: m.LoginPage,
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
            Component: m.DashboardPage,
          })),
      },
      {
        path: "transactions",
        lazy: () =>
          import("@features/transactions/pages/TransactionsPage").then((m) => ({
            Component: m.TransactionsPage,
          })),
      },
      {
        path: "accounts",
        lazy: () =>
          import("./pages/TreasuryPage").then((m) => ({
            Component: m.TreasuryPage,
          })),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
