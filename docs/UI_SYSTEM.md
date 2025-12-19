# Sistema UI: El Lenguaje Visual

La consistencia visual de Toro Group Financial depende de la disciplina al usar `@core`.

## 1. La Librería Core (`src/core`)

Esta carpeta es nuestro "UI Kit Interno". Trátala como una dependencia de terceros.

### Componentes Atómicos (`@core/ui`)

- **Button**: Usar para todas las acciones. Soporta `variant` (primary, ghost, danger).
- **Badge**: Usar para etiquetas de estado (Pagado, Pendiente).
- **ThemeToggle**: Cambiador de modo estándar.

### Bloques de Layout (`@core/layout`)

- **Card**: El contenedor fundamental.
  ```tsx
  <Card>
    <div className="p-4">Contenido</div>
  </Card>
  ```
- **Header / Sidebar**: Componentes shell globales. No modificarlos para necesidades específicas de una feature.

### Feedback (`@core/feedback`)

- **Spinner**: Usar para estados de carga.

## 2. Arquitectura de Formularios (`@core/form`)

Estandarizamos los formularios para asegurar accesibilidad y manejo de errores consistente.

- **FormField**: Envoltorio que maneja etiquetas y mensajes de error.
- **Input**: Input HTML estilizado.

**Ejemplo de Uso**:

```tsx
import { FormField, Input } from "@core/form";

<FormField label="Monto" error={errors.amount?.message}>
  <Input {...register("amount")} placeholder="0.00" />
</FormField>;
```

## 3. Estilos y Tailwind

- Usamos **TailwindCSS** para estilos utilitarios.
- **Colores del Tema**: Definidos en `tailwind.config.js`. Usa `bg-brand-900` o `text-brand-500` en lugar de valores hex arbitrarios.
- **Modo Oscuro**: Soportado nativamente vía el prefijo `dark:`.

## 4. Sistema de Overlay (`@core/overlay`)

- **Modal**: La ventana base para crear/editar registros.
- **Modales Específicos**: `SupportModal`, `SettingsModal` son overlays globales disponibles en el Layout.
