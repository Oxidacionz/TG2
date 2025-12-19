# Plan de Transición de Arquitectura - Fase 1

**Objetivo**: Migrar de Atomic Design a "Screaming Architecture" (Feature-based), comenzando con la feature más crítica: **Transactions**.

## 1. Análisis de Situación: Puntos de Fricción

Basado en el estado actual del proyecto, he identificado 3 problemas críticos que esta migración resolverá:

1.  **Dispersión Cognitiva**: Para modificar "Transacciones", un desarrollador debe saltar entre `src/components/organisms/TransactionForm.tsx`, `src/hooks/useTransactionController.ts`, `src/services/TransactionService.ts` y `src/types/finance.d.ts`. La lógica está fragmentada por *tipo técnico* en lugar de *dominio*.
2.  **Ambigüedad en Componentes**: Componentes como `TransactionRow` viven en `molecules`, mientras que `TransactionsTable` vive en `organisms`. La distinción es puramente visual y no aporta valor al negocio, haciendo difícil saber dónde buscar o crear nuevos componentes específicos.
3.  **Acoplamiento Global**: Hooks como `useTransactionController` están expuestos globalmente en `src/hooks`, sugiriendo que podrían usarse en cualquier lugar, cuando en realidad pertenecen estrictamente al dominio de transacciones. Esto ensucia el namespace global.

## 2. Definición de la Fase 1

En esta fase **NO** tocaremos `Accounts`, `Debts`, `Auth` ni el `Dashboard` general. Nos enfocaremos en dos nuevos directorios:

-   `src/core/`: Para bloques de construcción UI reutilizables y agnósticos al negocio (puros).
-   `src/features/transactions/`: Para todo lo relacionado con el dominio de Transacciones (UI, Lógica, Estado, API).

## 3. Mapeo de Archivos (Move List)

### A: `src/core/components` (UI Pura)
Estos componentes perderán su jerarquía atómica explicita en el nombre de la carpeta, agrupándose por utilidad.

| Archivo Actual (Atomic) | Nuevo Destino (Core) | Notas |
| :--- | :--- | :--- |
| `src/components/atoms/Button.tsx` | `src/core/components/ui/Button.tsx` | UI Primitiva |
| `src/components/atoms/Input.tsx` | `src/core/components/form/Input.tsx` | Form Primitiva |
| `src/components/atoms/Badge.tsx` | `src/core/components/ui/Badge.tsx` | UI Primitiva |
| `src/components/atoms/Spinner.tsx` | `src/core/components/feedback/Spinner.tsx` | Feedback |
| `src/components/atoms/Card.tsx` | `src/core/components/layout/Card.tsx` | Layout |
| `src/components/organisms/Modal.tsx` | `src/core/components/overlay/Modal.tsx` | Overlay (Generic) |
| `src/components/molecules/FormField.tsx` | `src/core/components/form/FormField.tsx` | Wrapper Genérico |

### B: `src/features/transactions` (Feature Domain)
Aquí convergen UI, Hooks, Servicios y Tipos específicos.

| Archivo Actual | Nuevo Destino (Feature) | Notas |
| :--- | :--- | :--- |
| **Páginas** | | |
| `src/pages/TransactionsView.tsx` | `src/features/transactions/pages/TransactionsPage.tsx` | Entry point |
| **Componentes** | | |
| `src/components/organisms/TransactionsTable.tsx` | `src/features/transactions/components/TransactionsTable.tsx` | |
| `src/components/organisms/TransactionForm.tsx` | `src/features/transactions/components/TransactionForm.tsx` | |
| `src/components/organisms/TransactionsFilterBar.tsx` | `src/features/transactions/components/TransactionsFilterBar.tsx` | |
| `src/components/molecules/TransactionRow.tsx` | `src/features/transactions/components/TransactionRow.tsx` | |
| `src/components/molecules/TransactionsHeader.tsx` | `src/features/transactions/components/TransactionsHeader.tsx` | |
| `src/components/molecules/TransactionSummaryCard.tsx` | `src/features/transactions/components/TransactionSummaryCard.tsx` | |
| `src/components/molecules/TransactionTypeSelector.tsx` | `src/features/transactions/components/TransactionTypeSelector.tsx` | |
| **Lógica & Estado** | | |
| `src/hooks/useTransactionController.ts` | `src/features/transactions/hooks/useTransactionForm.ts` | Rename para claridad |
| `src/constants/transactionConfig.ts` | `src/features/transactions/config/constants.ts` | |
| **Datos** | | |
| `src/services/TransactionService.ts` | `src/features/transactions/services/transaction.service.ts` | |
| `src/types/*.ts` (Extractos relacionados) | `src/features/transactions/types/index.ts` | Definiciones locales |

## 4. Plan de Acción Paso a Paso

1.  **Scaffolding**: Crear las carpetas destino.
    ```bash
    mkdir -p src/core/components/{ui,form,feedback,layout,overlay}
    mkdir -p src/features/transactions/{components,hooks,services,types,pages,config}
    ```

2.  **Move Core**: Mover los componentes UI base primero.
    -   *Reto*: Actualizar imports en todo el proyecto.
    -   *Estrategia*: Mover 1 a 1 y usar "Find & Replace" global para actualizar las rutas (ej. `components/atoms/Button` -> `core/components/ui/Button`).

3.  **Move Feature (Transactions)**: Mover archivos de transacciones.
    -   Colocar componentes, hooks y servicios en su nueva "casa".
    -   Actualizar referencias internas (ahora los imports entre ellos serán relativos `./`).

4.  **Refactor Imports**:
    -   Corregir referencias en `src/App.tsx` o `src/AppRouter.tsx` para apuntar a la nueva `TransactionsPage`.
    -   Asegurar que `TransactionsPage` importe correctamente sus componentes hijos desde `./components`.

5.  **Clean Up**: Eliminar carpetas vacías en `src/components/atoms`, etc.

## 5. Criterios de Éxito

Para considerar la Fase 1 completada, debemos verificar:

1.  **Build Exitoso**: `npm run build` (o `tsc`) no debe arrojar errores de importación.
2.  **Funcionalidad Intacta**: La vista de Transacciones debe cargar, filtrar y permitir crear transacciones exactamente igual que antes.
3.  **Aislamiento**: Ningún archivo fuera de `src/features/transactions` debería importar algo *interno* de transacciones (excepto la Page principal para el Router).
4.  **Core Limpio**: Los componentes en `src/core` no deben tener dependencias de `src/features`.
