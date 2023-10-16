const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://43.202.46.227:8080/",
      changeOrigin: true,
    })
  );
};
