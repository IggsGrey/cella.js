const
	webpack = require('webpack'),
	path = require('path');


let config = {

	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									'targets': {
										'node': '10'
									}
								}
							]
						]
					}
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
		]
	},
	resolve: {
		extensions: ['*', '.ts', '.tsx', '.wasm', '.mjs', '.js', '.jsx', '.json', '.vue'],
	},
	output: {
		path: __dirname + '/dist',
		filename: 'index.js',
		library: 'Cella',
		libraryTarget: 'umd'
	},
	devtool: 'source-map',
	externals: {
		'crypto-js': {
			commonjs: 'crypto-js',
			commonjs2: 'crypto-js',
			amd: 'crypto-js',
			root: 'CryptoJS',
		},
	},
	plugins: [
		// new JavaScriptObfuscator (obfuscatorOptions)
	],
};

module.exports = config;