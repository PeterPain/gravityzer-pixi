const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/register');

const publicPath = path.resolve('/public');
const config = {
	entry: ['@babel/polyfill', './src/index.js'],
	output: {
		path: publicPath,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true
		})
	],
	resolve: {
		modules: [path.resolve('./src'), path.resolve('./node_modules')]
	},
	devServer: {
		contentBase: publicPath,
		compress: true,
		port: 9000,
		open: true,
		stats: {
			assets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			colors: true,
			entrypoints: false,
			hash: false,
			modules: false,
			timings: false,
			version: false
		}
	},
	watch: false,
	devtool: 'source-map'
};

module.exports = config;
