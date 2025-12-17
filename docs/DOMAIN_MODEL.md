# Modelo de Dominio y Datos

## Entidades Principales

La aplicación gestiona datos financieros centrados en Transacciones, Cuentas y Deudas.

### Transacción (Transaction)

La entidad central que representa un intercambio de divisas o una transferencia.

- **Propiedades**:
  - `id`: Identificador único (string)
  - `amount`: Valor monetario
  - `currency`: Divisa involucrada (USD, VES, COP)
  - `type`: Dirección del flujo (ENTRADA, SALIDA)
  - `rate`: Tasa de cambio aplicada
  - `status`: Estado actual (Completado, Pendiente)
  - `client`: Nombre del cliente

### Cuenta (Account)

Representa una cuenta bancaria o tenencia de efectivo.

- **Propiedades**:
  - `bankName`: Nombre de la institución
  - `holder`: Nombre del titular de la cuenta
  - `balance`: Fondos actuales
  - `currency`: Divisa de la cuenta
  - `type`: Clasificación (EFECTIVO, BANCO, PLATAFORMA)

### Deuda (Debt)

Representa cuentas por cobrar o por pagar.

- **Propiedades**:
  - `type`: "COBRAR" (Por cobrar) o "PAGAR" (Por pagar)
  - `amount`: Monto adeudado
  - `status`: Estado del pago (PENDIENTE, PAGADO, VENCIDO)
  - `due_date`: Fecha en la que se espera el pago

## Enums y Constantes

Utilizamos tipado estricto para estados y categorías usando Enums de TypeScript.

- **Currency**: `USD`, `VES`, `COP`, `EUR`
- **TransactionType**: `ENTRADA` (Ingreso), `SALIDA` (Egreso/Salida)
- **Role**: `ADMIN`, `OPERADOR`, `VISITOR`
- **DebtStatus**: `PENDIENTE`, `PAGADO`, `VENCIDO`

## Tipos de TypeScript

Las definiciones de tipos se encuentran en `src/types/`.

- `finance.d.ts`: Entidades de negocio principales (Transacción, Cuenta, Deuda, Gasto).
- `auth.d.ts`: Definiciones de Usuario y Sesión.
- `ui.d.ts`: Tipos específicos de la interfaz de usuario (ej. opciones de tema).
