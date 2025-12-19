# Modelo de Dominio: Las Reglas de la Farmacia

Este documento describe las entidades de negocio principales y las reglas críticas que gobiernan la aplicación **Toro Group Financial**.

## 1. Entidades Principales

### 🏛️ Account (Cuenta)

Representa una fuente de fondos. Puede ser una cuenta bancaria, efectivo o billetera digital.

- **Atributos**: `id`, `bankName`, `holder`, `balance` (saldo), `currency` (moneda), `type`.
- **Reglas**:
  - `balance` es la verdad absoluta de la liquidez disponible.
  - `currency` determina el símbolo y reglas de formato.

### 💸 Transaction (Transacción)

El registro inmutable del movimiento de dinero.

- **Atributos**: `id`, `amount`, `type` (INGRESO/GASTO), `status`, `account_id`, `date`.
- **Reglas**:
  - **Inmutabilidad**: Una vez conciliada, una transacción idealmente no debería cambiar (aunque se permite editar para correcciones).
  - **Impacto**: Cada transacción muta directamente el saldo de una `Account` (conceptualmente).

### 🤝 Debt (Deuda)

Representa dinero que nos deben (**Por Cobrar**) o que debemos (**Por Pagar**).

- **Atributos**: `client_name`, `amount`, `due_date`, `status` (PENDIENTE/PAGADO).
- **Reglas**:
  - Una deuda típicamente comienza como `PENDIENTE`.
  - Cuando una deuda es `PAGADA`, dispara una `Transaction` que aumenta/disminuye el saldo de una Cuenta.

### 💱 Exchange Rate (Tasa de Cambio)

Configuración global para conversión de monedas.

- **Atributos**: `from`, `to`, `rate`, `source`.
- **Reglas**:
  - **Tasa de Referencia**: A menudo anclada al BCV (Banco Central de Venezuela) o mercado Paralelo.
  - **Uso**: Usado para normalizar reportes al ver el patrimonio total en una sola moneda (ej. equivalente en USD).

## 2. Puntos Clave de Lógica de Negocio

### Cálculo de Ganancias

- Fórmula Estándar: `Ganancia = (Precio Venta - Precio Compra) - Gastos`
- En escenarios multi-moneda, todos los valores se normalizan a USD usando la tasa efectiva _al momento de la transacción_.

### Manejo de Monedas (VES/USD)

- **VES (Bolívares)**: Tratado como moneda volátil.
- **USD/USDT**: Tratado como reserva de valor estable.
- La interfaz del sistema prioriza la visualización en USD pero soporta entrada en VES con sugerencia automática de tasa.

### El Concepto de "Cliente"

- Actualmente tratado como un literal de texto (`client_name`) adjunto a Deudas o Transacciones, en lugar de una entidad relacional pesada. Se mantiene ligero por velocidad.
