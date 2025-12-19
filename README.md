# Toro Group Financial

**Toro Group Financial** es un dashboard de gestión financiera moderno construido con React 19, TypeScript y una **Arquitectura Basada en Features** escalable.

## 🚀 Características Clave

- **Arquitectura Modular**: Construido con un enfoque de "Screaming Architecture" donde las features de negocio (`@features/debts`, `@features/accounts`) están desacopladas de la UI core (`@core`).
- **Seguridad de Tipos**: 100% cobertura estricta de TypeScript con una capa saneada `@domain`.
- **Stack Moderno**: React 19, React Router v7, TailwindCSS v4, Supabase.
- **Rendimiento**: Build optimizado con Vite.

## 📚 Documentación

La documentación técnica se encuentra en la carpeta `docs/`. Seguimos estrictamente estas pautas:

- **[🗺️ Mapa de Arquitectura](./docs/ARCHITECTURE.md)**: Entiende la separación `@features` vs `@core`.
- **[⚖️ Modelo de Dominio](./docs/DOMAIN_MODEL.md)**: Reglas de negocio para Cuentas, Transacciones y Tasas de Cambio.
- **[🌊 Estado y Flujo de Datos](./docs/STATE_DATA_FLOW.md)**: Cómo se mueven los datos desde Supabase a la UI.
- **[🎨 Sistema UI](./docs/UI_SYSTEM.md)**: Cómo usar el kit de UI `@core`.
- **[🛠️ Guía de Contribución](./docs/CONTRIBUTING.md)**: **LEE ESTO** antes de crear una nueva feature.
- **[⚙️ Guía de Configuración](./docs/SETUP.md)**: Instalación y variables de entorno.

## ⚡ Inicio Rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar Entorno
# Copia .env.example a .env y añade tus llaves de Supabase

# 3. Correr Servidor Dev
pnpm dev
```

## 🏗️ Estructura del Proyecto

```text
src/
├── features/        # Lógica de Negocio (Auth, Dashboard, Accounts, Debts)
├── core/            # Primitivos UI Compartidos (Button, Layout, Nav)
├── layouts/         # Envoltorios de Página
├── types/           # Entidades de Dominio (@domain)
└── lib/             # Servicios Externos (Supabase client)
```

---

Desarrollado por **Toro Group Financial**.
