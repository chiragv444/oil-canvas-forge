// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'oil-painting',
      // Serve the built SPA from /dist with single-page fallback
      script: './node_modules/serve/bin/serve.js',
      args: '-s dist -l 8001',
      cwd: '/var/www/oil-canvas-forge', // adjust if your path differs
      env: {
        NODE_ENV: 'production'
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      error_file: '/var/log/pm2/oil-painting-error.log',
      out_file: '/var/log/pm2/oil-painting-out.log',
      max_memory_restart: '300M'
    }
  ]
};
