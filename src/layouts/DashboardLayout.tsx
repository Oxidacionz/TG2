import { Outlet } from "react-router";
// Use "react-router" instead of "react-router-dom" as requested in REFACTOR_PLAN
import { DashboardTemplate } from "../components/templates/DashboardTemplate";
import { Sidebar } from "../components/organisms/Sidebar";
import { Header } from "../components/organisms/Header";
import { Modal } from "../components/organisms/Modal";
import { TransactionForm } from "../components/organisms/TransactionForm";
import { SettingsModal } from "../components/organisms/SettingsModal";
import { SupportModal } from "../components/organisms/SupportModal";
import { useDashboardController } from "../hooks/useDashboardController";

export const DashboardLayout = () => {
  const { session, userRole, ui, data, theme, handlers } =
    useDashboardController();

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

          isOpen={ui.isSidebarOpen}
          onClose={() => ui.setSidebarOpen(false)}
          onScan={() => {
            ui.setTransactionModalOpen(true);
            ui.setSidebarOpen(false);
          }}
          onSupport={() => {
            ui.setSupportModalOpen(true);
            ui.setSidebarOpen(false);
          }}
          userRole={userRole}
        />
      }
      header={
        <Header
          // currentView removed
          isDarkMode={theme.isDarkMode}
          toggleTheme={theme.toggleTheme}
          onMenuClick={() => ui.setSidebarOpen(!ui.isSidebarOpen)}
          userEmail={session.user.email}
          onSettings={() => ui.setIsSettingsModalOpen(true)}
        />
      }
    >
      {/* Outlet renders the child route (the specific View) */}
      <Outlet context={{ refreshTrigger: data.refreshTrigger }} />

      {/* Global Modals */}
      <Modal
        isOpen={ui.isTransactionModalOpen}
        onClose={() => ui.setTransactionModalOpen(false)}
        title="Registrar Transacción"
        size="lg"
      >
        <TransactionForm
          onSuccess={handlers.handleTransactionSuccess}
          onCancel={() => ui.setTransactionModalOpen(false)}
          userEmail={session.user.email}
        />
      </Modal>

      <SettingsModal
        isOpen={ui.isSettingsModalOpen}
        onClose={() => ui.setIsSettingsModalOpen(false)}
        userEmail={session.user.email}
      />

      <SupportModal
        isOpen={ui.isSupportModalOpen}
        onClose={() => ui.setSupportModalOpen(false)}
      />
    </DashboardTemplate>
  );
};
