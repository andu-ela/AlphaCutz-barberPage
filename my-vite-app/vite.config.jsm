import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // The root directory should be one level above `src` if index.html is there
  build: {
    outDir: 'dist', // Ensure the output directory is correctly set
    rollupOptions: {
      input: './index.html', // Path to your `index.html` file in the root folder
    },
  },
  plugins: [react()],
});
