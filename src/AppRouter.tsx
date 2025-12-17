import { createBrowserRouter, redirect } from "react-router";
import { authService } from "./services/AuthService";

// Importamos los componentes directamente (no como JSX)
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoginView } from "./pages/LoginView"; // La vista que acabamos de sugerir

// Vistas del Dashboard
import { DashboardView } from "./pages/DashboardView";
import { TransactionsView } from "./pages/TransactionsView";
import { ClientsView } from "./pages/ClientsView";
import { OperatorsView } from "./pages/OperatorsView";
import { ExpensesView } from "./pages/ExpensesView";
import { ReportsView } from "./pages/ReportsView";
import { AccountsView } from "./pages/AccountsView";
import { NotesView } from "./pages/NotesView";
import { DevView } from "./pages/DevView";

// --- 🔒 LÓGICA DE PROTECCIÓN (Loaders) ---

// Bloquea si NO hay sesión (Protege el Dashboard)
async function protectedLoader() {
  const { session } = await authService.getSession();
  if (!session) {
    throw redirect("/login");
  }
  return { session };
}

// Bloquea si YA hay sesión (Evita ver el Login si ya entraste)
async function publicLoader() {
  const { session } = await authService.getSession();

  if (session) {
    throw redirect("/");
  }
  return null;
}

// --- 🗺️ DEFINICIÓN DE RUTAS ---

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginView, // Sintaxis limpia: Pasamos la referencia, no el JSX
    loader: publicLoader, // Protección anti-login-doble
  },
  {
    path: "/",
    Component: DashboardLayout, // El Layout principal
    loader: protectedLoader, // 🛡️ Muro de contención: Nadie pasa sin sesión
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
]);
