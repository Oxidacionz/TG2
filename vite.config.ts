import path from 'path';
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

const CONFIG: UserConfig = {
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } }
};

export default defineConfig(CONFIG);
