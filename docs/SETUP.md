# Configuración e Instalación del Proyecto

## Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **Gestor de Paquetes**: pnpm (preferido) o npm

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd toro-group-financial
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o
   npm install
   ```

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz basado en `.env.example` (si está disponible).
Variables requeridas:

```env
VITE_SUPABASE_URL=tu_url_de_proyecto_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

## Ejecución del Proyecto

### Servidor de Desarrollo

Inicia el servidor de desarrollo local con HMR (Hot Module Replacement).

```bash
pnpm dev
```

Acceda a la aplicación en `http://localhost:5173`.

### Construcción para Producción

Compila la aplicación para producción.

```bash
pnpm build
```

Previsualizar la construcción de producción localmente:

```bash
pnpm preview
```

## Scripts de Calidad de Código

- **Lint**: Verificar problemas en el código.
  ```bash
  pnpm lint
  ```
- **Formateo**: Formatear el código con Prettier.
  ```bash
  pnpm format
  ```
- **Type Check**: Ejecutar la verificación del compilador de TypeScript.
  ```bash
  pnpm type-check
  ```
