var webpack = require('webpack');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/app.js',
	],
	output: {
		path: __dirname + '/build',
		filename: 'app.js',
		publicPath: 'http://localhost:8080'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ }
		]
	}
}