import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',       // Asegura que la raíz del proyecto sea la carpeta actual
    base: './',      // Asegura que los archivos se carguen correctamente en la raíz
    publicDir: 'public'
});
 