import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.js',
  },
};