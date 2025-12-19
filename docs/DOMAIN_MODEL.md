# Domain Model

This document outlines the core business entities and data structures used in the application.

## 📊 Core Entities

### 1. Transaction

The central entity representing a financial operation.

| Field      | Type              | Description                                                        |
| ---------- | ----------------- | ------------------------------------------------------------------ |
| `id`       | `string`          | Unique identifier (e.g., "#t1").                                   |
| `type`     | `TransactionType` | Enum: `INCOME` (Ingreso), `EXPENSE` (Egreso), `EXCHANGE` (Cambio). |
| `amount`   | `number`          | The amount of money involved.                                      |
| `currency` | `Currency`        | Enum: `USD`, `VES`, `EUR`, `USDT`.                                 |
| `rate`     | `number`          | Exchange rate applied at the time of transaction.                  |
| `profit`   | `number`          | Calculated profit from the transaction.                            |
| `status`   | `string`          | Status of the transaction (e.g., "Completado").                    |
| `client`   | `string`          | Name of the client involved.                                       |
| `operator` | `string`          | ID/Name of the operator who processed it.                          |

### 2. Account

Represents a storage of value, such as a bank account, cash drawer, or digital wallet.

| Field      | Type          | Description                                                |
| ---------- | ------------- | ---------------------------------------------------------- |
| `id`       | `number`      | Unique ID.                                                 |
| `bankName` | `string`      | Name of the bank or platform (e.g., "Banesco", "Binance"). |
| `currency` | `Currency`    | The currency held in this account.                         |
| `balance`  | `number`      | Current funds available.                                   |
| `type`     | `AccountType` | Enum identifying the category (Cash vs Bank).              |

### 3. Debt (Deudas)

Tracks money owed to the business or by the business.

- **Types**:
  - `COBRAR`: Accounts Receivable (Money incoming).
  - `PAGAR`: Accounts Payable (Money outgoing).
- **Status**: `PENDING`, `PAID` (from `DebtStatus`).

## 💱 Business Logic

### Profit Calculation

Profit is calculated dynamically based on the transaction margin.

- **Formula**: `Profit = Amount * (ProfitPercentage / 100)` (simplified).
- In `TransactionForm`, this is handled by `useTransactionController`.

### Exchange Rates

Rates are fetched from external providers ("bcv", "binance").

- **Structure**: `{ from: "USD", to: "VES", rate: 36.5 }`
- **Service**: `ExchangeRateService` handles fetching and caching these rates.

## 🔑 Enumerations (Enums)

- **Currency**: `USD`, `VES`, `EUR`, `USDT`, `COP`.
- **TransactionType**: Defines the direction of money flow.
- **AccountType**: `CASH` (Efectivo), `BANK` (Bancos), `WALLET` (Digital).
- **Role**: `ADMIN`, `OPERATOR` (User permissions).
