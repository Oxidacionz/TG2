import { useState } from "react";
import { useLoaderData } from "react-router"; // Importar hook del router
import { useTheme } from "./useTheme";
import { authService } from "../services/AuthService";

export const useDashboardController = () => {
  // Global State (Recuperado del Loader del Router)
  const loaderData = useLoaderData() as { session: any }; // Type assertion simple por ahora
  const session = loaderData?.session || null;

  // TODO: Mejorar manejo de roles real desde metadatos o tabla de perfiles
  const userRole = "ADMIN";

  // UI State
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  // Theme
  const { isDarkMode, toggleTheme } = useTheme();

  // Logic
  const handleTransactionSuccess = () => {
    setTransactionModalOpen(false);
    setDataRefreshTrigger((prev) => prev + 1);
  };

  const handleLogout = async () => {
    await authService.signOut();
    // El App.tsx detectará el cambio y redirigirá
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
    theme: {
      isDarkMode,
      toggleTheme,
    },
    handlers: {
      handleTransactionSuccess,
      handleLogout, // Exponemos el handler
    },
  };
};
