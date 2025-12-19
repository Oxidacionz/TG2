import { createBrowserRouter, redirect, RouteObject } from "react-router";
import { authService } from "./services/AuthService";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoginView } from "./pages/LoginView";
import { DashboardView } from "./pages/DashboardView";
import { TransactionsPage } from "@features/transactions/pages/TransactionsPage";
import { TreasuryPage } from "./pages/TreasuryPage";

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

// --- DEFINICIÓN DE RUTAS ---

const routes: RouteObject[] = [
  {
    path: "/login",
    Component: LoginView,
    loader: publicLoader,
    hydrateFallbackElement: (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Spinner size="lg" />
      </div>
    ),
  },
  {
    path: "/",
    Component: DashboardLayout,
    loader: protectedLoader,
    hydrateFallbackElement: (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Spinner size="lg" />
      </div>
    ),
    children: [
      {
        index: true,
        Component: DashboardView,
      },
      {
        path: "transactions",
        Component: TransactionsPage,
      },

      {
        path: "accounts",
        Component: TreasuryPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
