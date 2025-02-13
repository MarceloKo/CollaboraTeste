const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/wopi',
		createProxyMiddleware({
			target: 'https://collaboraapi.financeirosimplificado.com',
			changeOrigin: true,
		})
	);
};
