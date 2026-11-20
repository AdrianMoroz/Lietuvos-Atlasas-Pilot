import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function entry(fileName: string) {
  return fileURLToPath(new URL(fileName, import.meta.url));
}

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        home: entry('./index.html'),
        balticSea: entry('./baltijos-jura.html'),
        coast: entry('./lietuvos-priekrante.html'),
        lagoon: entry('./kursiu-marios.html'),
        monitoring: entry('./stebesena.html'),
        data: entry('./duomenys.html'),
        about: entry('./apie-pilota.html'),
        designGuide: entry('./dizaino-kalba.html'),
      },
    },
  },
});
