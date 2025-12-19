# State Management & Data Flow

This document explains how state is managed, persisted, and synchronized across the application.

## 🧠 Global State (Context API)

We use React Context for state that needs to be accessible globally.

### 1. `AuthContext`

Manages the user's session and authentication status.

- **Provider**: `AuthProvider.tsx`
- **State**:
  - `user`: Current `AppUser` object.
  - `session`: Supabase session details.
  - `loading`: Boolean flag for initial session check.
- **Persistence**: Relies on Supabase client's built-in local storage persistence.

### 2. `ThemeContext` (Implicit via Hook)

While primarily managed via a hook, the theme state is global in effect.

- **Hook**: `useTheme`
- **Persistence**: `localStorage` (key: `"theme"`).
- **Mechanism**: Syncs with `document.documentElement` attribute `data-theme`.

## 🎣 Local State & Controllers (Hooks)

We use the **Controller Pattern** to separate view logic from business logic.

### `useTransactionController`

Manages the `TransactionForm` state.

- **Responsibilities**:
  - Form validation (via `react-hook-form`).
  - Real-time calculations (VES conversions, Profit estimtates).
  - File attachment handling.
  - Submitting data to `TransactionService`.

### `useExchangeRates`

Manages fetching and refreshing currency rates.

- **Responsibilities**:
  - Fetching data from `ExchangeRateService`.
  - Handling loading and error states for rate widgets.

## 📡 Data Layer (Services)

The application uses a **Service Layer** to communicate with the backend. Components strictly call Services, never the API/DB directly.

- **`AuthService`**: Login, Logout, Session recovery.
- **`TransactionService`**: Create, Read, Update Transactions.
- **`ExchangeRateService`**: Fetch live rates from external APIs.

**Flow Example (Creating a Transaction):**

1. User submits form in `TransactionForm`.
2. `useTransactionController` validates data.
3. Controller calls `transactionService.createTransaction(dto)`.
4. Service sends data to Supabase (or Mock).
5. On success, Controller triggers UI success state (e.g., closes modal).
