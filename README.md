# Toro Group Financial

**Toro Group Financial** is a modern financial management dashboard built with React 19, TypeScript, and a scalable **Feature-based Architecture**.

## 🚀 Key Features

*   **Modular Architecture**: Built with a "Screaming Architecture" approach where business features (`@features/debts`, `@features/accounts`) are decoupled from the core UI (`@core`).
*   **Type Safety**: 100% strict TypeScript coverage with a sanitized `@domain` layer.
*   **Modern Stack**: React 19, React Router v7, TailwindCSS v4, Supabase.
*   **Performance**: Optimized build with Vite.

## 📚 Documentation

The technical documentation is located in the `docs/` folder. We strictly follow these guidelines:

*   **[🗺️ Architecture Map](./docs/ARCHITECTURE.md)**: Understand the `@features` vs `@core` separation.
*   **[⚖️ Domain Model](./docs/DOMAIN_MODEL.md)**: Business rules for Accounts, Transactions, and Exchange Rates.
*   **[🌊 State & Data Flow](./docs/STATE_DATA_FLOW.md)**: How data moves from Supabase to the UI.
*   **[🎨 UI System](./docs/UI_SYSTEM.md)**: How to use the `@core` UI kit.
*   **[🛠️ Contributing Guide](./docs/CONTRIBUTING.md)**: **READ THIS** before creating a new feature.
*   **[⚙️ Setup Guide](./docs/SETUP.md)**: Installation and Environment variables.

## ⚡ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure Environment
# Copy .env.example to .env and add Supabase keys

# 3. Run Dev Server
pnpm dev
```

## 🏗️ Project Structure

```text
src/
├── features/        # Business Logic (Auth, Dashboard, Accounts, Debts)
├── core/            # Shared UI Primitives (Button, Layout, Nav)
├── layouts/         # Page Wrappers
├── types/           # Domain Entities (@domain)
└── lib/             # External services (Supabase client)
```

---
Developed by **Toro Group Financial**.
