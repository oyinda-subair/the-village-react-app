import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        {
          find: '@assets',
          replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
        {
          find: '@components',
          replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
        },
        {
          find: '@interface',
          replacement: fileURLToPath(new URL('./src/interface', import.meta.url)),
        },
        { find: '@view', replacement: fileURLToPath(new URL('./src/view', import.meta.url)) },
        { find: '@redux', replacement: fileURLToPath(new URL('./src/redux', import.meta.url)) },
        {
          find: '@slices',
          replacement: fileURLToPath(new URL('./src/redux/slices', import.meta.url)),
        },
        {
          find: '@services',
          replacement: fileURLToPath(new URL('./src/redux/services', import.meta.url)),
        },
        { find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
      ],
    },
  });
};
