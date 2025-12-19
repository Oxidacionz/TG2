# Setup Guide

## Prerequisites
- Node.js 20+
- pnpm (recommended)

## Installation

1.  **Clone the repository**
    ```bash
    git clone <repo_url>
    cd toro-group-financial
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root based on `.env.example`.
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server**
    ```bash
    pnpm dev
    ```

## Build for Production

```bash
pnpm build
```
