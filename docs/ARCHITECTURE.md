# Architecture Overview

This document provides a high-level overview of the technical architecture for the **Toro Group Financial** application.

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styles**: Custom CSS Modules + Global Themes (Variables)
- **Backend/Database**: [Supabase](https://supabase.com/) (Integration in progress)
- **Package Manager**: pnpm

## 📂 Project Structure

The project follows a hybrid structure combining **Atomic Design** for UI components and **Feature-based** organization for logic.

```text
src/
├── components/          # UI Components (Atomic Design)
│   ├── atoms/           # Basic building blocks (Buttons, Inputs, Badges)
│   ├── molecules/       # Simple combinations (Cards, FormFields)
│   ├── organisms/       # Complex sections (Forms, Tables, Charts)
│   └── templates/       # Page layouts
├── hooks/               # Custom React Hooks (Logic Controllers)
├── services/            # API & Data Access Layer
├── context/             # Global State (Auth, Theme)
├── types/               # TypeScript Definitions (Domain & UI)
├── pages/               # Route Views
└── styles/              # Global CSS & Design Tokens
```

## 🏗 Core Architectural Patterns

### 1. Service Layer Pattern

We abstract all data access and external API calls into `services/`.

- **Purpose**: To decouple the UI from the backend implementation.
- **Current State**: Services like `TransactionService` currently use mocks (`MockTransactionService`) but are designed to be easily swapped for Supabase implementations without changing frontend code.

### 2. Controller Pattern (Custom Hooks)

Complex component logic is extracted into custom hooks (e.g., `useTransactionController`).

- **Benefit**: Keeps UI components "dumb" and focused on rendering. The hook manages form state, calculations, and side effects.

### 3. Atomic Design

UI components are organized by complexity.

- **Atoms**: Indivisible elements (e.g., `<Button />`).
- **Molecules**: Groups of atoms functioning together (e.g., `<TransactionRow />`).
- **Organisms**: Complex interface parts (e.g., `<TransactionsTable />`).

## 🔐 Security & Configuration

### Environment Variables

Sensitive data and configuration are managed via `.env` files.

- `VITE_SUPABASE_URL`: Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: Public API key.

### Authentication

Authentication is handled via `AuthContext`, which persists session state. The actual authentication logic resides in `AuthService`.
