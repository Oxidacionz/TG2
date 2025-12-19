import { Outlet } from "react-router";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import { Sidebar } from "@core/layout/Sidebar";
import { Header } from "@core/layout/Header";
import { Modal } from "@core/overlay/Modal";
import { TransactionForm } from "@features/transactions/components/TransactionForm";
// TODO: refactor these modals
import { SettingsModal } from "../components/organisms/SettingsModal";
import { SupportModal } from "../components/organisms/SupportModal";
import { useDashboardController } from "../hooks/useDashboardController";

export const DashboardLayout = () => {
  const { session, userRole, ui, data, handlers } = useDashboardController();

  return (
    <DashboardTemplate
      sidebar={
        <Sidebar
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
          onMenuClick={() => ui.setSidebarOpen(!ui.isSidebarOpen)}
          userEmail={session.user.email}
          onSettings={() => ui.setIsSettingsModalOpen(true)}
          onLogout={handlers.handleLogout}
        />
      }
    >
      <Outlet
        context={{
          refreshTrigger: data.refreshTrigger,
          openTransactionModal: () => ui.setTransactionModalOpen(true),
        }}
      />

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
