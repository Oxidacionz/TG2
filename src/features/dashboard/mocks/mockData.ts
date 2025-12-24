import { MOCK_TRANSACTIONS } from "@features/transactions/mocks/mockTransactions";

import { MOCK_CHART_DATA } from "./mockChartData";

export const MOCK_USER = {
  id: "mock-user-id",
  email: "admin@torogroup.com",
  role: "ADMIN",
  user_metadata: {
    name: "Admin User",
  },
};

export const MOCK_DATA = {
  transactions: MOCK_TRANSACTIONS,
  chartData: MOCK_CHART_DATA,
  user: MOCK_USER,
};
