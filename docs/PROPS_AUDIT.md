# Props Audit

This document lists props identified during the audit that are currently "drilled" through components or passed redundantly, and are candidates for Global State management (Context, Zustand, Redux, etc.).

## Identified Props

### `session` / `user`

- **Location**: `DashboardLayout` -> `Header` (as `userEmail`), `Sidebar` (logic removed but conceptually relevant), `TransactionForm` (as `userEmail`), `SettingsModal` (as `userEmail`).
- **Recommendation**: This is the prime candidate for an `AuthContext` or `UserContext`. The session data is needed across the entire dashboard.

### `userRole`

- **Location**: `useDashboardController` -> `DashboardLayout`.
- **Recommendation**: Should be part of the `AuthContext` or a `PermissionsContext`.

### `ui` State (Modal Controls)

- **Location**: `useDashboardController` -> `DashboardLayout` -> `Sidebar` (callbacks to open modals), `Header` (callbacks).
- **Recommendation**: A `UIContext` or a store (like Zustand) would effectively clean up the `useDashboardController`.
  - `isTransactionModalOpen`
  - `isSupportModalOpen`
  - `isSettingsModalOpen`
  - `isSidebarOpen`

### `data` / `refreshTrigger`

- **Location**: `useDashboardController` -> `DashboardLayout` -> `Outlet` (context).
- **Recommendation**: If this triggers re-fetches across the app, a `QueryClient` (React Query) invalidation strategy would be robust, or a simple `DataContext` event bus.

## Summary

The `useDashboardController` acts as a "giant container" pattern. While it centralizes logic, it forces `DashboardLayout` to be aware of everything. Migrating `user/session` and `ui` logic to contexts would significantly simplify `DashboardLayout`.
