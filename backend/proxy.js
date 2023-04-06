const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const apiKey = '7f258aeb7ee544ee9616003fc68c809d';

app.use('/api', createProxyMiddleware({
    target: 'https://haveibeenpwned.com',
    changeOrigin: true,
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('hibp-api-key', apiKey);
    },
}));

app.listen(3001, () => {
    console.log('Proxy server listening on port 3001');
});
