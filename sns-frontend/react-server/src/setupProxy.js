const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/spring', '/img'], {
      target: 'http://localhost:4000/',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware(['/node', '/img', '/socket.io'], {
      target: 'http://localhost:3001/',
      changeOrigin: true,
      ws: true,
      router: {
        '/socket.io': 'ws://localhost:3001/',
      },
    })
  );
};
