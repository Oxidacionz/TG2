import { useState } from "react";
import { MOCK_DATA } from "../mocks/mockData";
import { useTheme } from "./useTheme";

export const useDashboardController = () => {
  // Global State
  const [session] = useState<any>({
    user: MOCK_DATA.user,
    access_token: "mock-token",
  });
  const [userRole] = useState(MOCK_DATA.user.role);

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
    },
  };
};
