import { defineConfig } from 'vite';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.ts'),
        background: resolve(__dirname, 'src/background.ts'),
        popup: resolve(__dirname, 'src/popup.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'copy-manifest',
      writeBundle() {
        writeFileSync(
          resolve(__dirname, 'dist/manifest.json'),
          JSON.stringify({
            manifest_version: 2,
            name: "Screen Reader Optimizer",
            version: "1.0",
            description: "A browser extension to optimize web pages for screen readers",
            permissions: [
              "activeTab",
              "storage"
            ],
            content_scripts: [
              {
                matches: ["<all_urls>"],
                js: ["content.js"]
              }
            ],
            background: {
              scripts: ["background.js"],
              persistent: false
            },
            browser_action: {
              default_popup: "popup.html"
            }
          }, null, 2)
        );
      }
    }
  ]
});
