# State & Data Flow: The Pipeline

**Data Flow Philosophy**: Unidirectional, Explicit, and Typed.

## 1. The Pipeline Architecture

Data travels through four strict layers before reaching the user.

```text
[ Database (Supabase) ] 
       ⬇️ (Raw Data)
   [ Service Layer ]  <-- (Clean, Validate, Transform to DTO)
       ⬇️ (Typed Promises)
    [ React Hook ]    <-- (Manage Loading, Error, Local State)
       ⬇️ (State Values)
    [ Component ]     <-- (Render UI)
```

### Layer Details:

1.  **The Lib (`src/lib/supabaseClient.ts`)**:
    *   Raw connection to the DB. Singleton instance.
    *   Use this ONLY inside Services.

2.  **The Service (`src/features/*/services/*.ts`)**:
    *   **Responsibility**: Communicate with the outside world.
    *   **Pure TS**: No React code here.
    *   **Output**: Returns `Promise<Data[]>`. Handle API errors here (e.g., throw standardized error).

3.  **The Hook (`src/features/*/hooks/*.ts`)**:
    *   **Responsibility**: Bind data to the React Lifecycle.
    *   **State**: Manages `loading`, `error`, and `data` state variables.
    *   **Action**: Exposes methods like `refresh()`, `create()`.

4.  **The Component (`src/features/*/components/*.tsx`)**:
    *   **Responsibility**: Display valid state.
    *   **Dumb**: Should ideally just call `useHook()` and render.

## 2. Global State Management

We avoid Redux/Zustand for now because the app domain is clearly segmented.

### AuthContext (`src/features/auth/context`)
*   **Purpose**: The **only** global state needed.
*   **Why**: User session data (`AppSession`) is needed everywhere (Sidebar, Headers, Protected Routes).
*   **Persistance**: Handled via Supabase Auth listener + LocalStorage backup if necessary.

## 3. Local State Management

*   **Forms**: `react-hook-form`. Do not use `useState` for complex forms.
*   **UI State**: Modals/Tabs use simple `useState` within the Page/Controller.
