# Domain Model: The Rules of the Pharmacy

This document outlines the core business entities and the critical rules that govern the **Toro Group Financial** application.

## 1. Prime Entities

### 🏛️ Account (Cuenta)
Represents a source of funds. Can be a bank account, cash wallet, or digital wallet.
*   **Attributes**: `id`, `bankName`, `holder`, `balance`, `currency`, `type`.
*   **Rules**:
    *   `balance` is the absolute truth of available liquidity.
    *   `currency` determines the symbol and formatting rules.

### 💸 Transaction (Transacción)
The immutable record of money movement.
*   **Attributes**: `id`, `amount`, `type` (INCOME/EXPENSE), `status`, `account_id`, `date`.
*   **Rules**:
    *   **Immutability**: Once reconciled, a transaction should ideally not change (though editing is allowed for corrections).
    *   **Impact**: Every transaction directly mutates an `Account` balance (conceptually).

### 🤝 Debt (Deuda)
Represents money owed **to** us (Receivable) or **by** us (Payable).
*   **Attributes**: `client_name`, `amount`, `due_date`, `status` (PENDING/PAID).
*   **Rules**:
    *   A debt typically starts as `PENDING`.
    *   When a debt is `PAID`, it triggers a `Transaction` that increases/decreases an Account balance.

### 💱 Exchange Rate (Tasa de Cambio)
Global configuration for currency conversion.
*   **Attributes**: `from`, `to`, `rate`, `source`.
*   **Rules**:
    *   **Reference Rate**: Often anchored to the BCV (Banco Central de Venezuela) or Parallel market.
    *   **Usage**: Used to normalize reporting when viewing total equity in a single currency (e.g., USD equivalent).

## 2. Business Logic Highlights

### Profit Calculation
*   Standard Formula: `Profit = (Sell Price - Buy Price) - Expenses`
*   In multi-currency scenarios, all values are normalized to USD using the rate effective *at the time of the transaction*.

### Currency Handling (VES/USD)
*   **VES (Bolivars)**: Treated as a volatile currency.
*   **USD/USDT**: Treated as stable store of value.
*   System Interface prioritizes USD visualization but supports entry in VES with automatic rate suggestion.

### The "Client" Concept
*   Currently treated as a string literal (`client_name`) attached to Debts or Transactions, rather than a heavy relational entity. Keep it lightweight for speed.
