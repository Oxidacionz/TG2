# Architecture Transition - Phase 2: Accounts & Debts

## 1. Goal

Migrate the "Accounts" and "Debts" domains from the monolithic structure to independent features.
Refine `src/core` by moving remaining agnostic components.

## 2. Analysis & Strategy

Currently, `AccountsView.tsx` acts as a "Treasury" container mixing both Accounts and Debts logic.
In this phase, we will:

1.  **Split** `AccountsView` logic into two distinct features: `accounts` and `debts`.
2.  **Extract** state management into specific hooks (`useAccounts`, `useDebts`).
3.  **Encapsulate** types and services within their respective features.
4.  **Purify** `src/components` by moving generic UI items to `@core`.

## 3. Move List

### A: Feature `src/features/accounts`

| Current File                                    | Destination                                             | Notes                     |
| :---------------------------------------------- | :------------------------------------------------------ | :------------------------ |
| `src/components/molecules/AccountCard.tsx`      | `src/features/accounts/components/AccountCard.tsx`      |                           |
| `src/components/organisms/AccountsList.tsx`     | `src/features/accounts/components/AccountsList.tsx`     |                           |
| `src/components/organisms/AccountFormModal.tsx` | `src/features/accounts/components/AccountFormModal.tsx` |                           |
| (New File)                                      | `src/features/accounts/hooks/useAccounts.ts`            | Logic extracted from View |
| `src/types/shared/index.ts` (Account def)       | **KEEP in @shared**                                     | Entity types stay shared  |

### B: Feature `src/features/debts`

| Current File                                 | Destination                                       | Notes                     |
| :------------------------------------------- | :------------------------------------------------ | :------------------------ |
| `src/components/molecules/DebtCard.tsx`      | `src/features/debts/components/DebtCard.tsx`      |                           |
| `src/components/organisms/DebtsList.tsx`     | `src/features/debts/components/DebtsList.tsx`     |                           |
| `src/components/organisms/DebtFormModal.tsx` | `src/features/debts/components/DebtFormModal.tsx` |                           |
| (New File)                                   | `src/features/debts/hooks/useDebts.ts`            | Logic extracted from View |
| `src/types/shared/index.ts` (Debt def)       | **KEEP in @shared**                               | Entity types stay shared  |

### C: Refine Core (`src/core`)

| Current File                                | Destination                            | Notes                          |
| :------------------------------------------ | :------------------------------------- | :----------------------------- |
| `src/components/molecules/DigitalClock.tsx` | `src/core/display/DigitalClock.tsx`    | **Verify Purity** (Props only) |
| `src/components/molecules/StatCard.tsx`     | `src/core/display/StatCard.tsx`        | **Verify Purity** (Props only) |
| `src/components/molecules/SidebarItem.tsx`  | `src/core/navigation/SidebarItem.tsx`  | Navigation primitive           |
| `src/components/molecules/UserDropdown.tsx` | `src/core/navigation/UserDropdown.tsx` | Navigation/UI                  |
| `src/components/atoms/ThemeToggle.tsx`      | `src/core/ui/ThemeToggle.tsx`          | UI Control                     |
| `src/components/atoms/Logo.tsx`             | `src/core/ui/Logo.tsx`                 | Branding                       |

## 4. Execution Plan (Step-by-Step)

### Step 1: Scaffolding

Create directory structures:

```bash
mkdir -p src/features/accounts/{components,hooks,pages,types,services}
mkdir -p src/features/debts/{components,hooks,pages,types,services}
mkdir -p src/core/{display,navigation}
```

### Step 2: Move Types & Services

- **Types**: Keep `Account` and `Debt` in `src/types/shared` (or `@shared`) as they are domain entities used by multiple features (Transactions, Accounts, Debts).
- Only move feature-specific types (e.g., `AccountFormData`) to `src/features/accounts/types`.

### Step 3: Implement Feature `accounts`

- Move components to `src/features/accounts/components`.
- Create `useAccounts` hook (Pure domain logic, no UI/Tab state).
- _No Page File_: Accounts will be consumed by `TreasuryPage`.

### Step 4: Implement Feature `debts`

- Move components to `src/features/debts/components`.
- Create `useDebts` hook (Pure domain logic).
- _No Page File_: Debts will be consumed by `TreasuryPage`.

### Step 5: Refine Core

- Move `DigitalClock`, `StatCard` to `src/core/display`.
- Ensure they are pure components (receive data via props).

### Step 6: Page Strategy (TreasuryPage)

- Rename `src/pages/AccountsView.tsx` to `src/pages/TreasuryPage.tsx`.
- Refactor `TreasuryPage` to:
  - Maintain the "Tabs" state (`ACCOUNTS` | `DEBTS`).
  - Import `AccountsList` (Smart Component or via Hook) from `@features/accounts`.
  - Import `DebtsList` (Smart Component or via Hook) from `@features/debts`.
  - Use `useAccounts` and `useDebts` hooks here or inside the lists.

## 5. Dependency Rules

- `accounts` should not import `debts`.
- `debts` should not import `accounts`.
- Both can import from `@core` and `@shared`.
