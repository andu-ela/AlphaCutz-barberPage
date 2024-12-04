import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'my-vite-app', // Specify the correct subdirectory
  build: {
    outDir: 'dist', // The output folder for your built app
    rollupOptions: {
      input: 'my-vite-app/index.html', // Ensure the entry HTML file is correct
    },
  },
});
