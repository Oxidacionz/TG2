# Architecture Transition Phase 4: Dashboard & Exchange Rates (Final)

This is the final phase of the transition to a Feature-based Architecture. We will consolidate the Dashboard and Exchange Rate features, dealing with the most critical business domain (rates) and the main visualization layer (dashboard). Finally, we will remove the legacy "Atomic Design" folder structure from the source root.

## Goals

1.  **Isolate Exchange Rates**: Move all rate logic and editing widgets to `@features/exchange-rates`.
2.  **Consolidate Dashboard**: Move the main view, controller, and specific visualization widgets to `@features/dashboard`.
3.  **Cleanup & Standardization**: Move orphan modals to `@core` and delete legacy directories (`src/components`, `src/hooks`, `src/services`, `src/mocks`).
4.  **Documentation**: Update system documentation to reflect the new architecture.

## 1. Feature: Exchange Rates (`src/features/exchange-rates`)

This feature handles the core business logic of currency exchange rates.

| Source File                                   | Destination                                                   | Type      |
| :-------------------------------------------- | :------------------------------------------------------------ | :-------- |
| `src/services/ExchangeRateService.ts`         | `src/features/exchange-rates/services/ExchangeRateService.ts` | Service   |
| `src/hooks/useExchangeRates.ts`               | `src/features/exchange-rates/hooks/useExchangeRates.ts`       | Hook      |
| `src/components/molecules/GlobalRateCard.tsx` | `src/features/exchange-rates/components/GlobalRateCard.tsx`   | Component |
| `src/components/organisms/EditRateModal.tsx`  | `src/features/exchange-rates/components/EditRateModal.tsx`    | Component |

## 2. Feature: Dashboard (`src/features/dashboard`)

This feature manages the main landing page and its specific widgets.

| Source File                                   | Destination                                              | Type          |
| :-------------------------------------------- | :------------------------------------------------------- | :------------ |
| `src/pages/DashboardView.tsx`                 | `src/features/dashboard/pages/DashboardPage.tsx`         | Page (Rename) |
| `src/hooks/useDashboardController.ts`         | `src/features/dashboard/hooks/useDashboardController.ts` | Hook          |
| `src/components/organisms/AnalyticsChart.tsx` | `src/features/dashboard/components/AnalyticsChart.tsx`   | Component     |
| `src/components/organisms/StatsOverview.tsx`  | `src/features/dashboard/components/StatsOverview.tsx`    | Component     |
| `src/components/organisms/TickerBoard.tsx`    | `src/features/dashboard/components/TickerBoard.tsx`      | Component     |
| `src/components/molecules/TickerCard.tsx`     | `src/features/dashboard/components/TickerCard.tsx`       | Component     |
| `src/mocks/mockChartData.ts`                  | `src/features/dashboard/mocks/mockChartData.ts`          | Mock          |
| `src/mocks/mockData.ts`                       | `src/features/dashboard/mocks/mockData.ts`               | Mock          |

## 3. Core Orphans (`src/core`)

General purpose components that were left behind.

| Source File                                  | Destination                          | Type      |
| :------------------------------------------- | :----------------------------------- | :-------- |
| `src/components/organisms/SupportModal.tsx`  | `src/core/overlay/SupportModal.tsx`  | Component |
| `src/components/organisms/SettingsModal.tsx` | `src/core/overlay/SettingsModal.tsx` | Component |

## 4. Execution Plan

### Step 1: Scaffolding

- Create directories:
  - `src/features/exchange-rates/{components,hooks,services}`
  - `src/features/dashboard/{components,hooks,pages,mocks}`

### Step 2: Move Exchange Rates

- Move files to `src/features/exchange-rates`.
- Update internal imports (service/hook connections).
- **Verify**: Check `ExchangeRateService` calls in `TickerBoard` (which is moving to Dashboard).

### Step 3: Move Dashboard

- Move files to `src/features/dashboard`.
- Update imports in `AppRouter` (point to `DashboardPage`).
- Update imports in `DashboardPage` (point to local components).
- **Refactor**: Update `TickerBoard` to import `GlobalRateCard` (if applicable) or `useExchangeRates` from `@features/exchange-rates`.

### Step 4: Cleanup Orphans & Root

- Move `SupportModal` and `SettingsModal` to `src/core/overlay`.
- Update usages in `DashboardLayout`, `LoginForm`, `UserDropdown`.
- **DELETE**: `src/components`, `src/hooks`, `src/services`, `src/mocks`.
- Update `tsconfig.json` paths if necessary (remove unused aliases).

### Step 5: Documentation & Verification

- Update `docs/ARCHITECTURE.md` to describe the Feature-based Architecture.
- Run `pnpm tsc` to ensure full system integrity.
