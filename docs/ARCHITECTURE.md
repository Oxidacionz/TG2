# Descripción General de la Arquitectura

## Introducción

El proyecto `toro-group-financial` es una aplicación web moderna diseñada para la gestión financiera y paneles de control (dashboards). Está construida utilizando una arquitectura de Aplicación de Una Sola Página (SPA), aprovechando React para la interfaz de usuario y Supabase para el backend.

## Stack Tecnológico

- **Framework de Frontend**: React 19
- **Herramienta de Construcción**: Vite
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Enrutamiento**: React Router v7
- **Backend / BaaS**: Supabase (Autenticación, Base de Datos, Tiempo Real)
- **Gráficos**: Recharts
- **Iconos**: React Icons
- **Formateo/Linting**: ESLint, Prettier

## Estructura de Directorios

El proyecto sigue una estructura híbrida basada en funcionalidades y diseño atómico:

```text
src/
├── components/       # Componentes de diseño atómico
│   ├── atoms/        # Componentes base (Botón, Input, Badge)
│   ├── molecules/    # Combinaciones simples (FormField, SidebarItem)
│   ├── organisms/    # Widgets complejos (TransactionsTable, Sidebar)
│   └── templates/    # Diseños de página (DashboardTemplate)
├── config/           # Configuración de toda la aplicación (constantes, navegación)
├── context/          # Contextos de React (AuthContext, etc.)
├── hooks/            # Hooks personalizados (useAuth, useDashboardController)
├── layouts/          # Diseños de rutas (DashboardLayout)
├── lib/              # Configuraciones de librerías externas (supabaseClient)
├── mocks/            # Datos ficticios para desarrollo/pruebas
├── pages/            # Componentes de página que mapean a rutas
├── services/         # Capa de API y lógica (TransactionService, AuthService)
├── styles/           # CSS global y definiciones de temas
└── types/            # Definiciones de tipos TypeScript (Dominio, API, UI)
```

## Patrones Arquitectónicos

### Diseño Atómico (Atomic Design)

Utilizamos el Diseño Atómico para organizar los componentes. Esto fomenta la reutilización y la consistencia.

- **Atoms**: Componentes indivisibles (ej. `Button`, `Input`).
- **Molecules**: Grupos de átomos que funcionan juntos (ej. `FormField`).
- **Organisms**: Secciones complejas de la interfaz (ej. `Sidebar`, `Header`).
- **Templates**: Estructuras a nivel de página a la espera de contenido.

### Capa de Servicio (Service Layer)

La lógica de negocio y las llamadas a la API están encapsuladas en el directorio `services/`. Los componentes NO deben realizar llamadas directas a la API, sino que deben usar estos servicios o hooks personalizados que los envuelvan. Esto desacopla la interfaz de usuario de la implementación del backend.

### Context API y Gestión de Estado

El estado global (como la Autenticación de Usuario) se gestiona a través de proveedores de React Context en `context/`. El estado local específico de cada funcionalidad se maneja dentro de las páginas o mediante hooks personalizados (ej. `useDashboardController`).
