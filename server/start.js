//启动一个服务器
const express = require('express');
const webpack =require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.dev.js');
//创建服务器
const server = express();
//配置启动路径
const staticMiddleware = express.static('dist');
//监听代码
const compiler = webpack(config);
const webpackMiddlewareCompiler = webpackMiddleware(compiler, config.devServer);
//热更新
const webpackHotMiddlewareCompiler = webpackHotMiddleware(compiler);

server.use(webpackMiddlewareCompiler);
server.use(webpackHotMiddlewareCompiler);
server.use(staticMiddleware);

server.listen(3010, () => {
    console.log('server is running...');
});