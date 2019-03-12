const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/page/index.js',
	plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "windows.jQuery": "jquery",
            jQuery: "jquery"
        }),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash].css",
        }),
		new HtmlWebpackPlugin({
			template: './src/view/index.html',
			favicon: './favicon.ico',
			title: 'SQL Editor'
		})
	],
    optimization: {
        splitChunks: {
            cacheGroups: {
                css: {
                    test: /\.(css|sass|scss)$/,
                    name: "commons",
                    chunks: "all",
                    minChunks: 2,
                }
            }
        },
        runtimeChunk: true
    },
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015']
                    }

                }
            },
			{
				test: /\.string$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{loader: 'css-loader'},
					{loader: 'sass-loader'}
				]
			},
            {
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 20000
		            }
		          }
		        ]
		    },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../fonts/",
                        outputPath: "static/fonts/"
                    }
                }]
            },
		]
	}
};
