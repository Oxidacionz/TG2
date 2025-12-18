// COMPONENTE CRITICO

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { MOCK_DATA } from "../mocks/mockData";
import { DashboardContextType, Transaction } from "../types";

// Organisms/Molecules
import { TransactionsHeader } from "../components/molecules/TransactionsHeader";
import { TransactionsFilterBar } from "../components/organisms/TransactionsFilterBar";
import { TransactionsTable } from "../components/organisms/TransactionsTable";

export const TransactionsView = ({ onScan }: { onScan?: () => void }) => {
  const { refreshTrigger, openTransactionModal } =
    useOutletContext<DashboardContextType>();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        setTransactions(MOCK_DATA.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

  return (
    <div className="flex flex-col gap-6">
      <TransactionsHeader onScan={openTransactionModal} />
      <TransactionsFilterBar />
      <TransactionsTable
        transactions={transactions}
        loading={loading}
        onScan={onScan}
      />
    </div>
  );
};
