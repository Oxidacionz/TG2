# Documentación de Componentes e Interfaz de Usuario (UI)

## Filosofía de Diseño

Seguimos la metodología de **Diseño Atómico (Atomic Design)** para construir una interfaz de usuario escalable y fácil de mantener.

## Estructura de Directorios `src/components/`

### Átomos (`/atoms`)

Bloques de construcción básicos. Altamente reutilizables, sin lógica.

- **Ejemplos**:
  - `Button.tsx`: Botones estándar primarios/secundarios.
  - `Badge.tsx`: Indicadores de estado.
  - `Input.tsx`: Entradas de texto de formulario.
  - `Spinner.tsx`: Indicador de estado de carga.

### Moléculas (`/molecules`)

Grupos de átomos que funcionan juntos.

- **Ejemplos**:
  - `FormField.tsx`: Etiqueta + Input + Mensaje de error.
  - `StatCard.stat.tsx`: Icono + Etiqueta + Visualización de valor.
  - `TransactionRow.tsx`: Una sola fila en la lista de transacciones.

### Organismos (`/organisms`)

Secciones complejas de la interfaz compuestas por moléculas y átomos. Pueden contener algo de lógica de negocio.

- **Ejemplos**:
  - `Sidebar.tsx`: Navegación principal.
  - `TransactionsTable.tsx`: Tabla de datos completa con encabezados y filas.
  - `LoginForm.tsx`: Formulario de autenticación con validación.

### Plantillas (`/templates`)

Diseños a nivel de página sin contenido específico.

- **Ejemplos**:
  - `DashboardTemplate.tsx`: Diseño de cuadrícula para la vista del panel de control.
  
### Componentes Configurables

Algunos componentes, como `TransactionForm`, utilizan configuraciones extraídas en `src/constants/` para facilitar la mantenibilidad (ej. listas de bancos, porcentajes de ganancia) cumpliendo con el principio Open/Closed.

## Estilos

- **Motor**: Tailwind CSS v4.
- **Tema**: Configurado en `tailwind.config.ts` (o mapeado en archivos de tema personalizados si se usan variables CSS de la v4).
- **Iconos**: Librería `react-icons`.

## Patrones Clave de Interfaz de Usuario

- **Modales**: Gestionados a través del estado global o local, superpuestos al contenido principal.
- **Paneles (Dashboards)**: Diseños basados en cuadrículas que responden al tamaño de la pantalla.
