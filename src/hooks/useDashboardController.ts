import { useState } from "react";
import { useLoaderData } from "react-router"; // Importar hook del router
import { authService } from "../services/AuthService";
import { AppSession } from "../types";

export const useDashboardController = () => {
  // Global State (Recuperado del Loader del Router)
  const loaderData = useLoaderData() as { session: AppSession | null };
  // User asked to replace any.
  // Let's import AppSession definitions.
  const session = loaderData?.session || null;

  // TODO: Mejorar manejo de roles real desde metadatos o tabla de perfiles
  const userRole = "ADMIN";

  // UI State
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  // Logic
  const handleTransactionSuccess = () => {
    setTransactionModalOpen(false);
    setDataRefreshTrigger((prev) => prev + 1);
  };

  const handleLogout = async () => {
    await authService.signOut();
  };

  return {
    session,
    userRole,
    ui: {
      isTransactionModalOpen,
      setTransactionModalOpen,
      isSupportModalOpen,
      setSupportModalOpen,
      isSettingsModalOpen,
      setIsSettingsModalOpen,
      isSidebarOpen,
      setSidebarOpen,
    },
    data: {
      refreshTrigger: dataRefreshTrigger,
    },
    handlers: {
      handleTransactionSuccess,
      handleLogout,
    },
  };
};
