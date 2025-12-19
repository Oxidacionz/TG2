# Guía de Configuración

## Requisitos Previos

- Node.js 20+
- pnpm (recomendado)

## Instalación

1.  **Clonar el repositorio**

    ```bash
    git clone <repo_url>
    cd toro-group-financial
    ```

2.  **Instalar dependencias**

    ```bash
    pnpm install
    ```

3.  **Variables de Entorno**
    Crea un archivo `.env` en la raíz basado en `.env.example`.

    ```env
    VITE_SUPABASE_URL=tu_supabase_url
    VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
    ```

4.  **Correr Servidor de Desarrollo**
    ```bash
    pnpm dev
    ```

## Construir para Producción

```bash
pnpm build
```
