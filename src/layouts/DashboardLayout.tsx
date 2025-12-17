import { useState } from "react";
import { Outlet } from "react-router"; // Use "react-router" instead of "react-router-dom" as requested in REFACTOR_PLAN
import { DashboardTemplate } from "../components/templates/DashboardTemplate";
import { Sidebar } from "../components/organisms/Sidebar";
import { Header } from "../components/organisms/Header";
import { Modal } from "../components/organisms/Modal";
import { TransactionForm } from "../components/organisms/TransactionForm";
import { SettingsModal } from "../components/organisms/SettingsModal";
import { SupportModal } from "../components/organisms/SupportModal";
import { useTheme } from "../hooks/useTheme";
import { MOCK_DATA } from "../mocks/mockData";

export const DashboardLayout = () => {
  // Global State (lifted from App.tsx)
  const [session] = useState<any>({
    user: MOCK_DATA.user,
    access_token: "mock-token",
  });
  // We can pass userRole via context if strict Auth is unimplemented
  const [userRole] = useState(MOCK_DATA.user.role);

  // UI State
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  // Theme
  const { isDarkMode, toggleTheme } = useTheme();

  // Handlers
  const handleTransactionSuccess = () => {
    setTransactionModalOpen(false);
    setDataRefreshTrigger((prev) => prev + 1);
    // Navigation to transactions view should happen naturally or via navigate() if needed,
    // but for now we just rely on the user being potentially on that page or navigating there.
    // In the old app logic, it switched view: setCurrentView("transactions")
    // We might want to use navigation here later: const navigate = useNavigate(); navigate('/transactions');
  };

  // const currentView = "dashboard"; // REMOVED

  return (
    <DashboardTemplate
      sidebar={
        <Sidebar
          // currentView removed
          // onViewChange will be ignored or we can just pass a no-op if the prop is still there,
          // but better to remove it from usage since I removed it from Sidebar component.
          // However, Sidebar might still expect onClose to close mobile menu.
          // Let's check Sidebar definition again. I used `onClose` in `handleNavigation`.

          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onScan={() => {
            setTransactionModalOpen(true);
            setSidebarOpen(false);
          }}
          onSupport={() => {
            setSupportModalOpen(true);
            setSidebarOpen(false);
          }}
          userRole={userRole}
        />
      }
      header={
        <Header
          // currentView removed
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
          userEmail={session.user.email}
          onSettings={() => setIsSettingsModalOpen(true)}
        />
      }
    >
      {/* Outlet renders the child route (the specific View) */}
      <Outlet context={{ refreshTrigger: dataRefreshTrigger }} />

      {/* Global Modals */}
      <Modal
        isOpen={isTransactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        title="Registrar Transacción"
        size="lg"
      >
        <TransactionForm
          onSuccess={handleTransactionSuccess}
          onCancel={() => setTransactionModalOpen(false)}
          userEmail={session.user.email}
        />
      </Modal>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userEmail={session.user.email}
      />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </DashboardTemplate>
  );
};
