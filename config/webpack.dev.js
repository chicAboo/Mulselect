const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '127.0.0.1';

module.exports = merge(common, {
	mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].js',
        publicPath: '/',
    },
    devServer:{
        contentBase: path.join(__dirname,"dist"),
        compress: true,
        port: 3011,
        https: protocol === 'https',
        host: host,
        hot: true,
        proxy: {
            "/api/*": {
                "target": "http://127.0.0.1:9796",
                "pathRewrite": {"^/api" : ""},
                "changeOrigin": true,
                "secure": false,
                "logLevel": "debug",
                "bypass": function(req, res) { console.log('哈哈：',res.statusCode) }
            }
        },
    },
    devtool: 'cheap-module-eval-source-map'
});