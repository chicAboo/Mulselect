const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash].js',
        publicPath: './',
    },
	plugins: [
        new CleanWebpackPlugin(['../dist']),
		new UglifyJSPlugin(),
        new optimizeCss()
	],
    devtool: 'source-map'
});