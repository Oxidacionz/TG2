// COMPONENTE CRITICO

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { MOCK_TRANSACTIONS } from "../mocks/mockTransactions";
import { Transaction } from "../types";
import { DashboardContextType } from "@/types/ui";

// Organisms/Molecules
import { TransactionsHeader } from "../components/TransactionsHeader";
import { TransactionsFilterBar } from "../components/TransactionsFilterBar";
import { TransactionsTable } from "../components/TransactionsTable";

export const TransactionsPage = ({ onScan }: { onScan?: () => void }) => {
  const { refreshTrigger, openTransactionModal } =
    useOutletContext<DashboardContextType>();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        setTransactions(MOCK_TRANSACTIONS);
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
