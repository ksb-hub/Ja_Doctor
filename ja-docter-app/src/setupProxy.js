// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://43.200.184.226',
      secure: false,
      changeOrigin: true,
      
    }),
  );
};