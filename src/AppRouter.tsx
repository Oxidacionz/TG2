import { createBrowserRouter, redirect, RouteObject } from "react-router";
import { authService } from "./services/AuthService";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoginView } from "./pages/LoginView";
import { DashboardView } from "./pages/DashboardView";
import { TransactionsView } from "./pages/TransactionsView";
import { ClientsView } from "./pages/ClientsView";
import { OperatorsView } from "./pages/OperatorsView";
import { ExpensesView } from "./pages/ExpensesView";
import { ReportsView } from "./pages/ReportsView";
import { AccountsView } from "./pages/AccountsView";
import { NotesView } from "./pages/NotesView";
import { DevView } from "./pages/DevView";

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
  },
  {
    path: "/",
    Component: DashboardLayout,
    loader: protectedLoader,
    children: [
      {
        index: true,
        Component: DashboardView,
      },
      {
        path: "transactions",
        Component: TransactionsView,
      },
      {
        path: "clients",
        Component: ClientsView,
      },
      {
        path: "operators",
        Component: OperatorsView,
      },
      {
        path: "expenses",
        Component: ExpensesView,
      },
      {
        path: "reports",
        Component: ReportsView,
      },
      {
        path: "accounts",
        Component: AccountsView,
      },
      {
        path: "notes",
        Component: NotesView,
      },
      {
        path: "dev",
        Component: DevView,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
