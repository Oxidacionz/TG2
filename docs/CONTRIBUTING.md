# Guía de Contribución: El Código de Conducta

Bienvenido al equipo de desarrollo. Sigue estas pautas para mantener el código limpio y escalable.

## 1. Reglas de Oro

1.  **Respeta la Arquitectura**: No crees archivos en la raíz `src`. Colócalos en la feature correcta o módulo core.
2.  **No Contaminación Cruzada**: La Feature A (`debts`) no debe importar componentes internos de la Feature B (`accounts`).
3.  **Core es Sagrado**: Nunca añadas lógica de negocio a `@core`. Si busca datos, pertenece a una `@feature`.
4.  **Sin `any`**: Somos estrictos con los tipos. Define interfaces.

## 2. Cómo Crear una Nueva Feature

¿Quieres añadir "Inversiones"? Sigue esta receta de andamiaje:

### Paso 1: Crear Estructura de Directorios

```bash
mkdir src/features/investments
mkdir src/features/investments/{components,hooks,services,types,pages}
```

### Paso 2: Definir Tipos

Crea `src/features/investments/types/index.ts`.

```ts
export interface Investment {
  id: number;
  ticker: string;
  amount: number;
}
```

### Paso 3: Crear Servicio

Crea `src/features/investments/services/InvestmentService.ts`. Conecta a Supabase aquí.

### Paso 4: Crear Hooks

Crea `useInvestments.ts` para gestionar el estado y llamar al servicio.

### Paso 5: Construir Componentes

Crea la UI en `components/`. Importa átomos de `@core/ui`.

### Paso 6: Exportar Página

Expón la vista principal en `pages/InvestmentsPage.tsx` y añádela a `AppRouter.tsx`.

## 3. Flujo de Trabajo de Desarrollo

1.  **Rama nueva**: `git checkout -b feature/mi-feature-genial`
2.  **Desarrollar**: Sigue los pasos anteriores.
3.  **Verificar**: Corre `pnpm tsc` para chequear errores de tipo.
4.  **Lint**: Corre `pnpm run lint` para limpiar estilo de código.
5.  **Commit**: Usa conventional commits (ej., `feat: add investments module`).
