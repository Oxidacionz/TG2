
import { useState, useEffect } from 'react';
import { AuthTemplate } from './src/components/templates/AuthTemplate';
import { DashboardTemplate } from './src/components/templates/DashboardTemplate';
import { LoginForm } from './src/components/organisms/LoginForm';
import { Sidebar } from './src/components/organisms/Sidebar';
import { Header } from './src/components/organisms/Header';
import { Modal } from './src/components/organisms/Modal';
import { TransactionForm } from './src/components/organisms/TransactionForm';
import { SettingsModal } from './src/components/organisms/SettingsModal';
import { Button } from './src/components/atoms/Button';
import { useTheme } from './hooks/useTheme';
import { DashboardView } from './src/pages/DashboardView';
import { TransactionsView } from './src/pages/TransactionsView';
import { supabase } from './src/lib/supabase';
import { ClientsView } from './src/pages/ClientsView';
import { OperatorsView } from './src/pages/OperatorsView';
import { ExpensesView } from './src/pages/ExpensesView';
import { ReportsView } from './src/pages/ReportsView';
import { AccountsView } from './src/pages/AccountsView';
import { NotesView } from './src/pages/NotesView';
import { DevView } from './src/pages/DevView';

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('OPERADOR'); // Estado para el rol
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const { isDarkMode, toggleTheme } = useTheme();

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [supportIssue, setSupportIssue] = useState('Olvidé mi contraseña');
  const [supportDesc, setSupportDesc] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  useEffect(() => {
    const initSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("Error sesión:", error);

        if (data.session) {
            setSession(data.session);
            // Fetch Role
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.session.user.id)
                .single();
            if (profile) setUserRole(profile.role);
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        if (session) {
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
            if (profile) setUserRole(profile.role);
        }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => await supabase.auth.signOut();
  const handleTransactionSuccess = () => {
    setTransactionModalOpen(false);
    setDataRefreshTrigger(prev => prev + 1);
    setCurrentView('transactions');
  };

  const handleSendSupport = () => {
    const subject = encodeURIComponent(`Soporte Toro Group: ${supportIssue}`);
    const bodyText = supportIssue === 'Otros' ? supportDesc : `Problema: ${supportIssue}`;
    window.open(`mailto:josephbrachovillanueva2@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`);
    setSupportModalOpen(false);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">Cargando Sistema...</div>;
  if (!session) return <AuthTemplate isDarkMode={isDarkMode} toggleTheme={toggleTheme}><LoginForm /></AuthTemplate>;

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
          userRole={userRole} // Pasamos el rol a la Sidebar
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

      {/* Solo renderizamos la vista Dev si el rol es DEV, seguridad extra visual */}
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
