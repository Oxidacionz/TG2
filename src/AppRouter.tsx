import { createBrowserRouter, type RouteObject } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardView } from "./pages/DashboardView";
import { TransactionsView } from "./pages/TransactionsView";
import { ClientsView } from "./pages/ClientsView";
import { OperatorsView } from "./pages/OperatorsView";
import { ExpensesView } from "./pages/ExpensesView";
import { ReportsView } from "./pages/ReportsView";
import { AccountsView } from "./pages/AccountsView";
import { NotesView } from "./pages/NotesView";
import { DevView } from "./pages/DevView";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardView />,
      },
      {
        path: "transactions",
        element: <TransactionsView />,
      },
      {
        path: "clients",
        element: <ClientsView />,
      },
      {
        path: "operators",
        element: <OperatorsView />,
      },
      {
        path: "expenses",
        element: <ExpensesView />,
      },
      {
        path: "reports",
        element: <ReportsView />,
      },
      {
        path: "accounts",
        element: <AccountsView />,
      },
      {
        path: "notes",
        element: <NotesView />,
      },
      {
        path: "dev",
        element: <DevView />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
