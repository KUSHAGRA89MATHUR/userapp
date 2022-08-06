const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  let url = 'http://localhost:3080';
  console.log("env", process.env.REACT_APP_ENVIRONMENT);
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    url = 'http://userapp-api:3080';
  }
  app.use(
    '/api',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
};