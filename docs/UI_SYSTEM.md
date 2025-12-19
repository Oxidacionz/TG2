# UI Design System

This project implements a strict **Atomic Design** methodology to ensure component reusability and scalability.

## 🎨 Atomic Structure

### 1. Atoms (`src/components/atoms`)

The smallest building blocks. They have no dependencies on other components.

- **Examples**:
  - `Button.tsx`: Standardized actionable element.
  - `Input.tsx`: Form input wrapper with styling.
  - `Badge.tsx`: Status indicators (e.g., for transaction status).
  - `Spinner.tsx`: Loading state indicator.

### 2. Molecules (`src/components/molecules`)

Combinations of atoms that form functional units.

- **Examples**:
  - `TransactionRow.tsx`: Combines text and Badges to show a single list item.
  - `StatCard.tsx`: Combines an Icon, Label, and Value for dashboard metrics.
  - `FormField.tsx`: Combines a Label and an Input with error messaging.

### 3. Organisms (`src/components/organisms`)

Complex, distinct sections of an interface. They handle business logic or group multiple molecules.

- **Examples**:
  - `TransactionsTable.tsx`: A complete table managing headers and rows.
  - `TransactionForm.tsx`: The entire form for creating transactions.
  - `Sidebar.tsx`: The main navigation menu.

### 4. Templates (`src/components/templates`)

Page-level layouts that define where organisms are placed.

- **Examples**:
  - `DashboardTemplate.tsx`: Defines the grid layout for the dashboard view.

## 🖌 Styling & Theming

### CSS Variables

We use CSS 5 variables for global theming, defined in `src/styles/theme.css`.

| Variable         | Description                      |
| ---------------- | -------------------------------- |
| `--primary`      | Main brand color.                |
| `--bg-main`      | Application background.          |
| `--text-primary` | Main text color.                 |
| `--card-bg`      | Background for cards and panels. |

### Dark Mode

Dark mode is implemented via the `data-theme="dark"` attribute on the `<html>` or `<body>` tag.

- **Mechanism**: The variables in `theme.css` change values based on `[data-theme='dark']`.
- **Toggle**: Managed by the `ThemeToggle` atom and `useTheme` hook.

### Fonts

We use **Inter** as the primary typeface.

- Font files are located in `public/assets/fonts/Inter`.
- CSS definitions are in `src/styles/fonts.css`.
