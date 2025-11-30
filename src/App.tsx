import { useState, useEffect } from 'react';
import { AuthTemplate } from './components/templates/AuthTemplate';
import { DashboardTemplate } from './components/templates/DashboardTemplate';
import { LoginForm } from './components/organisms/LoginForm';
import { Sidebar } from './components/organisms/Sidebar';
import { Header } from './components/organisms/Header';
import { Modal } from './components/organisms/Modal';
import { TransactionForm } from './components/organisms/TransactionForm';
import { SettingsModal } from './components/organisms/SettingsModal';
import { Button } from './components/atoms/Button';
import { useTheme } from './hooks/useTheme';
import { DashboardView } from './pages/DashboardView';
import { TransactionsView } from './pages/TransactionsView';
import { supabase } from './lib/supabaseClient';
import { ClientsView } from './pages/ClientsView';
import { OperatorsView } from './pages/OperatorsView';
import { ExpensesView } from './pages/ExpensesView';
import { ReportsView } from './pages/ReportsView';
import { AccountsView } from './pages/AccountsView';
import { NotesView } from './pages/NotesView';
import { DevView } from './pages/DevView';

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState("OPERADOR");
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const { isDarkMode, toggleTheme } = useTheme();

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [supportIssue, setSupportIssue] = useState("Olvidé mi contraseña");
  const [supportDesc, setSupportDesc] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  useEffect(() => {
    const debugInfo: any = {
      init: "🔵 initSession: iniciando...",
      getSession: null,
      profileQuery: null,
      final: null,
      authChanges: [],
      render: null,
    };

    const fetchProfile = async (userId: string) => {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      debugInfo.profileQuery = { profile, profileError };
      if (profile) {
        setUserRole(profile.role);
      }
    };

    const initSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        debugInfo.getSession = { data, error };

        if (data?.session) {
          setSession(data.session);
          await fetchProfile(data.session.user.id);
        } else {
          debugInfo.profileQuery = "⚪ No hay sesión activa";
        }
      } catch (err: any) {
        debugInfo.final = { error: err };
      } finally {
        setIsLoading(false); // 🔴 Garantizamos que se libere la carga
        debugInfo.final = { isLoading: false };
        console.log("📊 DEPURACIÓN COMPLETA:", debugInfo);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        debugInfo.authChanges.push({ event: _event, session });
        setSession(session);

        if (session) {
          await fetchProfile(session.user.id);
        }

        // 🔴 Solo liberamos carga si aún está activa
        if (isLoading) {
          setIsLoading(false);
          debugInfo.final = { isLoading: false };
        }

        console.log("📊 DEPURACIÓN COMPLETA (authChange):", debugInfo);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session && isLoading) {
      console.log("🟢 Sesión detectada, liberando carga...");
      setIsLoading(false);
    }
  }, [session, isLoading]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleTransactionSuccess = () => {
    setTransactionModalOpen(false);
    setDataRefreshTrigger((prev) => prev + 1);
    setCurrentView("transactions");
  };

  const handleSendSupport = () => {
    const subject = encodeURIComponent(`Soporte Toro Group: ${supportIssue}`);
    const bodyText =
      supportIssue === "Otros"
        ? supportDesc
        : `Problema: ${supportIssue}`;
    window.open(
      `mailto:josephbrachovillanueva2@gmail.com?subject=${subject}&body=${encodeURIComponent(
        bodyText
      )}`
    );
    setSupportModalOpen(false);
  };

  const renderDebug = { isLoading, session, userRole, currentView };
  console.log("📊 DEPURACIÓN RENDER:", renderDebug);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">
        Cargando Sistema...
      </div>
    );

  if (!session)
    return (
      <AuthTemplate isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
        <LoginForm />
      </AuthTemplate>
    );

  return (
    <DashboardTemplate
      sidebar={
        <Sidebar
          currentView={currentView}
          onViewChange={(view) => { setCurrentView(view); setSidebarOpen(false); }}
          onScan={() => { setTransactionModalOpen(true); setSidebarOpen(false); }}
          onSupport={() => { setSupportModalOpen(true); setSidebarOpen(false); }}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole={userRole}
        />
      }
      header={
        <Header
          currentView={currentView}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
          userEmail={session.user.email}
          onSettings={() => setIsSettingsModalOpen(true)}
        />
      }
    >
      {currentView === 'dashboard' && <DashboardView refreshTrigger={dataRefreshTrigger} />}
      {currentView === 'transactions' && <TransactionsView onScan={() => setTransactionModalOpen(true)} refreshTrigger={dataRefreshTrigger} />}
      {currentView === 'clients' && <ClientsView />}
      {currentView === 'operators' && <OperatorsView />}
      {currentView === 'expenses' && <ExpensesView />}
      {currentView === 'reports' && <ReportsView />}
      {currentView === 'accounts' && <AccountsView />}
      {currentView === 'notes' && <NotesView />}
      {currentView === 'dev' && userRole === 'DEV' && <DevView />}

      <Modal isOpen={isTransactionModalOpen} onClose={() => setTransactionModalOpen(false)} title="Registrar Transacción" size="lg">
        <TransactionForm onSuccess={handleTransactionSuccess} onCancel={() => setTransactionModalOpen(false)} userEmail={session.user.email} />
      </Modal>

      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} userEmail={session.user.email} />

      <Modal isOpen={isSupportModalOpen} onClose={() => setSupportModalOpen(false)} title="Soporte Técnico">
         <div className="space-y-4">
            <select className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white" value={supportIssue} onChange={(e) => setSupportIssue(e.target.value)}>
                <option>Olvidé mi contraseña</option>
                <option>Falla en software</option>
                <option>Otros</option>
            </select>
            {supportIssue === 'Otros' && (
                <textarea className="w-full p-2 border rounded dark:bg-slate-800 dark:text-white" rows={3} value={supportDesc} onChange={(e) => setSupportDesc(e.target.value)} placeholder="Describe el problema..." />
            )}
            <Button className="w-full" onClick={handleSendSupport}>Enviar</Button>
         </div>
      </Modal>
    </DashboardTemplate>
  );
};

export default App;
