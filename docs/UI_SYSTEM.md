# UI System: The Visual Language

The visual consistency of Toro Group Financial relies on the discipline of using `@core`.

## 1. The Core Library (`src/core`)

This folder is our "Internal UI Kit". Treat it as a third-party dependency.

### Atomic Components (`@core/ui`)
*   **Button**: Use for all actions. Supports `variant` (primary, ghost, danger).
*   **Badge**: Use for status labels (Paid, Pending).
*   **ThemeToggle**: Standard mode switcher.

### Layout Blocks (`@core/layout`)
*   **Card**: The fundamental container.
    ```tsx
    <Card>
      <div className="p-4">Content</div>
    </Card>
    ```
*   **Header / Sidebar**: Global shell components. Do not modify these for specific feature needs.

### Feedback (`@core/feedback`)
*   **Spinner**: Use for loading states.

## 2. Form Architecture (`@core/form`)

We standardize forms to ensure accessibility and consistent error handling.

*   **FormField**: Wrapper that handles labels and error messages.
*   **Input**: Styled HTML input.

**Example Usage**:
```tsx
import { FormField, Input } from "@core/form";

<FormField label="Monto" error={errors.amount?.message}>
  <Input {...register("amount")} placeholder="0.00" />
</FormField>
```

## 3. Styles & Tailwind

*   We use **TailwindCSS** for utility styling.
*   **Theme Colors**: Defined in `tailwind.config.js`. Use `bg-brand-900` or `text-brand-500` instead of arbitrary hex values.
*   **Dark Mode**: Supported natively via the `dark:` prefix.

## 4. Overlay System (`@core/overlay`)

*   **Modal**: The base window for creating/editing records.
*   **Specific Modals**: `SupportModal`, `SettingsModal` are global overlays available in the Layout.
