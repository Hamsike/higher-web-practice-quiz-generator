import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: '/index.html',
  },
  appType: 'mpa',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        quizzes: resolve(__dirname, 'quizzes.html'),
      },
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) return 'css/[name]-[hash].[ext]';
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) return 'fonts/[name]-[hash].[ext]';
          if (/\.(png|jpe?g|gif|svg)$/.test(name ?? '')) return 'images/[name]-[hash].[ext]';
          return 'assets/[name]-[hash].[ext]';
        },
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  optimizeDeps: {
    include: ['zod'],
  },
});
