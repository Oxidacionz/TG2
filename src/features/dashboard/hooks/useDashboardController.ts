import { useState } from "react";
import { useLoaderData } from "react-router";
import { authService } from "@features/auth/services/AuthService";
import { AppSession } from "@/types";

export const useDashboardController = () => {
  const loaderData = useLoaderData() as { session: AppSession | null };

  const session = loaderData?.session || null;

  const userRole = "ADMIN";

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

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
