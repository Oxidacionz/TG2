# Architecture Transition Planning - Phase 3 (Auth & Shell)

## Goal
Complete the architectural transition by migrating the Authentication system to a self-contained feature (`@features/auth`) and refining the application shell (Layout, Navigation, Configuration) into the Core layer (`@core`).

## 1. Analysis & Strategy

### Authentication Feature
The `auth` feature is a "kernel" feature. Unlike business features (accounts, debts), it is cross-cutting but should still be self-contained.
- **State**: `AuthContext` and `AuthProvider` should belong to `features/auth/context`.
- **Logic**: `useAuth` hook and `AuthService` service belong to `features/auth`.
- **UI**: `LoginForm` and `LoginView` belong to `features/auth`.
- **Rule**: Other features MUST NOT access `AuthContext` directly; they should use the `useAuth` hook from `@features/auth`.

### Application Shell (Core)
The "Shell" consists of the Layout, Navigation, and Global Configuration. These are feature-agnostic scaffolding for the app.
- **Layouts**: `DashboardLayout` stays in `src/layouts` (already there), but dependencies might need updating.
- **Navigation/UI**: `Sidebar`, `Header` should move to `@core/layout` or `@core/navigation`.
- **Config**: Root configuration (`src/config`) should move to `@core/config` to keep the root `src` clean.

## 2. Move List (Mapeo de Archivos)

### A: Feature `src/features/auth`

| Current File | Destination | Note |
| :--- | :--- | :--- |
| `src/context/AuthContext.ts` | `src/features/auth/context/AuthContext.ts` | |
| `src/context/AuthProvider.tsx` | `src/features/auth/context/AuthProvider.tsx` | |
| `src/hooks/useAuth.ts` | `src/features/auth/hooks/useAuth.ts` | |
| `src/services/AuthService.ts` | `src/features/auth/services/AuthService.ts` | |
| `src/components/organisms/LoginForm.tsx` | `src/features/auth/components/LoginForm.tsx` | |
| `src/pages/LoginView.tsx` | `src/features/auth/pages/LoginPage.tsx` | Rename to `LoginPage` for consistency |

### B: Refactor Layout & Navigation (`@core`)

| Current File | Destination | Note |
| :--- | :--- | :--- |
| `src/components/organisms/Sidebar.tsx` | `src/core/layout/Sidebar.tsx` | Main Nav container |
| `src/components/organisms/Header.tsx` | `src/core/layout/Header.tsx` | Top bat |
| `src/components/molecules/NotificationDropdown.tsx` | `src/core/navigation/NotificationDropdown.tsx` | |
| `src/layouts/DashboardLayout.tsx` | `src/layouts/DashboardLayout.tsx` | **Verify Imports** (Already in place) |

### C: Global Config (`@core/config`)

| Current File | Destination | Note |
| :--- | :--- | :--- |
| `src/config/navigation.tsx` | `src/core/config/navigation.tsx` | |
| `src/config/constants.ts` | `src/core/config/constants.ts` | |

## 3. Execution Plan (Step-by-Step)

### Step 1: Scaffolding `auth` and `core`
- Create directories:
  - `src/features/auth/{components,context,hooks,pages,services}`
  - `src/core/{config,layout}`

### Step 2: Implement Feature `auth`
- Move Auth files.
- Refactor `useAuth` to import from local context.
- Ensure `App.tsx` and `AppRouter.tsx` import `AuthProvider` and `LoginPage` from feature.

### Step 3: Refactor Core Shell
- Move Config files to `src/core/config`.
- Move Sidebar/Header to `src/core/layout`.
- Update `DashboardLayout` imports.

### Step 4: Cleanup
- Remove empty `src/context` (if empty).
- Remove empty `src/config`.
- Verify `src/services` only contains feature-agnostic services (like `ExchangeRateService`... actually that might belong to a feature later, but out of scope for now).

### Step 5: Verify
- Run `pnpm run dev` and check Login flow.
- Check Sidebar navigation.
- Run `pnpm tsc` (Important!).

## 4. Success Criteria
- [ ] No circular dependencies in Auth.
- [ ] App compiles without TypeScript errors.
- [ ] Folder structure is clean (`src/components` should be very thin now).
