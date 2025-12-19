# Estado y Flujo de Datos: La Tubería

**Filosofía de Flujo de Datos**: Unidireccional, Explícito y Tipado.

## 1. La Arquitectura de Tubería

Los datos viajan a través de cuatro capas estrictas antes de llegar al usuario.

```text
[ Base de Datos (Supabase) ]
       ⬇️ (Datos Crudos)
   [ Capa de Servicio ]  <-- (Limpiar, Validar, Transformar a DTO)
       ⬇️ (Promesas Tipadas)
    [ React Hook ]       <-- (Gestionar Loading, Error, Estado Local)
       ⬇️ (Valores de Estado)
    [ Componente ]       <-- (Renderizar UI)
```

### Detalles de las Capas:

1.  **La Lib (`src/lib/supabaseClient.ts`)**:
    - Conexión cruda a la BD. Instancia Singleton.
    - Usar esto SOLO dentro de Servicios.

2.  **El Servicio (`src/features/*/services/*.ts`)**:
    - **Responsabilidad**: Comunicarse con el mundo exterior.
    - **TypeScript Puro**: Aquí no va código React.
    - **Salida**: Retorna `Promise<Data[]>`. Maneja errores de API aquí.

3.  **El Hook (`src/features/*/hooks/*.ts`)**:
    - **Responsabilidad**: Atar los datos al Ciclo de Vida de React.
    - **Estado**: Gestiona variables de `loading`, `error` y `data`.
    - **Acción**: Expone métodos como `refresh()`, `create()`.

4.  **El Componente (`src/features/*/components/*.tsx`)**:
    - **Responsabilidad**: Mostrar estado válido.
    - **Tonto**: Idealmente solo debería llamar a `useHook()` y renderizar.

## 2. Gestión de Estado Global

Evitamos Redux/Zustand por ahora porque el dominio de la app está claramente segmentado.

### AuthContext (`src/features/auth/context`)

- **Propósito**: El **único** estado global necesario.
- **Por qué**: Los datos de sesión de usuario (`AppSession`) se necesitan en todas partes (Sidebar, Headers, Rutas Protegidas).
- **Persistencia**: Manejada vía listener de Auth de Supabase + respaldo en LocalStorage si es necesario.

## 3. Gestión de Estado Local

- **Formularios**: `react-hook-form`. No uses `useState` para formularios complejos.
- **Estado UI**: Modales/Tabs usan `useState` simple dentro de la Página/Controlador.
