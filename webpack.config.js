const autoprefixer		      = require('autoprefixer');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const webpackNodeExternals 	  = require('webpack-node-externals');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path 	  			      = require('path');
const UglifyJsPlugin 	      = require('uglifyjs-webpack-plugin');
const webpack 	      		  = require('webpack');

const isProduction = (process.env.NODE_ENV === 'production');
const clientConfig = {
	entry: './src/client/index.js',
	output: {
		path: path.join(__dirname, 'assets/public'),
		filename: 'bundle.js',
		publicPath: '/assets/public'
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: !isProduction ? 'images/[name].[ext]' : 'images/[hash].[ext]'
							// publicPath: url => url.replace('dist/', "")
						}  
					}
				]					
			},
			// {
			// 	test: /\.(svg|eot|ttf|woff|woff2)$/,
			// 	use: {
			// 		loader: 'url-loader',
			// 		options: {
			// 			limit: 100000,
			// 			name: 'assets/fonts/[name].[ext]'
			// 		}
			// 	}
			// },
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer()],
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}]
				})
			}
		]
	},
	devtool: isProduction ? 'source-map' : 'inline-source-map',
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js$/,
				exclude: /node_modules/,
				parallel: true,
				sourceMap: true,
				cache: true,
			}),
		  	new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css')
	],
};

const serverConfig = {
	target: 'node',
    entry: './src/server/index.js',
	output: {
		path: path.join(__dirname, 'assets/build'),
		filename: 'bundle.js',
		publicPath: '/assets/build'
	},
	module: {
		rules: [
            {
			    loader: 'babel-loader',
			    test: /\.js$/,
			    exclude: /node_modules/
            }
        ]
    },
	externals: [webpackNodeExternals()]
};

module.exports = [clientConfig, serverConfig];