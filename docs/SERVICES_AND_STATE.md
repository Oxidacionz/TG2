# Gestión de Servicios y Estado

## Capa de Servicio (Service Layer)

La lógica de negocio está abstraída en servicios que se encuentran en `src/services/`.

### TransactionService

Gestiona las operaciones relacionadas con las transacciones financieras.

- **Métodos**:
  - `createTransaction(data)`: Valida y persiste una nueva transacción.
  - `getTransactions(filter)`: Recupera una lista de transacciones basadas en criterios.
  - `updateStatus(id, status)`: Modifica el estado de una transacción.

### AuthService

Gestiona la autenticación de usuarios con Supabase.

- **Métodos**:
  - `login(email, password)`
  - `logout()`
  - `getSession()`

### ExchangeRateService

Obtiene y proporciona las tasas de cambio de divisas actuales.

- **Métodos**:
  - `getRates()`: Devuelve las tasas actuales para USD/VES/COP.

## Gestión de Estado

### Context API

El estado global de la aplicación se gestiona utilizando React Context.

#### AuthContext

- **Proveedor**: `AuthProvider.tsx`
- **Hook**: `useAuth()`
- **Estado**:
  - `user`: Objeto del usuario actual que ha iniciado sesión.
  - `session`: Token de sesión de Supabase.
  - `loading`: Estado de la verificación de autenticación.

### Hooks Personalizados

La lógica específica de cada funcionalidad está encapsulada en hooks personalizados.

#### `useDashboardController`

Gestiona el estado para la vista del Panel de Control (Dashboard).

- **Responsabilidades**:
  - Obtención de estadísticas resumidas.
  - Manejo de listas de transacciones recientes.
  - Gestión de estados de modales para "Nueva Transacción" o "Editar Tasa".
  - Exposición de acciones (como abrir modales) a través del contexto del Dashboard.

#### `useTransactionController`

Encapsula la lógica para la vista de Transacciones.

- **Responsabilidades**:
  - Filtrado y ordenación de transacciones.
  - Paginación (si está implementada).
  - Acciones masivas.

## Integración con la API

- **Cliente**: `src/lib/supabaseClient.ts` inicializa el cliente de Supabase.
- **Patrón**: Los servicios importan el cliente para ejecutar consultas. Los componentes importan servicios (o hooks que los utilizan).
