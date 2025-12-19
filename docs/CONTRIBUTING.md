# Contributing Guide: The Code of Conduct

Welcome to the development team. Follow these guidelines to keep the codebase clean and scalable.

## 1. Golden Rules

1.  **Respect the Architecture**: Do not create files in the `src` root. Place them in the correct feature or core module.
2.  **No Cross-contamination**: Feature A (`debts`) should not import internal components of Feature B (`accounts`).
3.  **Core is Holy**: Never add business logic to `@core`. If it fetches data, it belongs in a `@feature`.
4.  **No `any`**: We are strict about types. Define interfaces.

## 2. How to Create a New Feature

Want to add "Investments"? Follow this scaffolding recipe:

### Step 1: Create Directory Structure
```bash
mkdir src/features/investments
mkdir src/features/investments/{components,hooks,services,types,pages}
```

### Step 2: Define Types
Create `src/features/investments/types/index.ts`.
```ts
export interface Investment {
  id: number;
  ticker: string;
  amount: number;
}
```

### Step 3: Create Service
Create `src/features/investments/services/InvestmentService.ts`. Connect to Supabase here.

### Step 4: Create Hooks
Create `useInvestments.ts` to manage the state and call the service.

### Step 5: Build Components
Create UI in `components/`. Import atoms from `@core/ui`.

### Step 6: Export Page
Expose the main view in `pages/InvestmentsPage.tsx` and add it to `AppRouter.tsx`.

## 3. Development Workflow

1.  **Branch off**: `git checkout -b feature/my-cool-feature`
2.  **Develop**: Follow the steps above.
3.  **Verify**: Run `pnpm tsc` to check for type errors.
4.  **Lint**: Run `pnpm run lint` to clean code style.
5.  **Commit**: Use conventional commits (e.g., `feat: add investments module`).
