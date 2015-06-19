import webpack from 'webpack';
import merge from 'lodash/object/merge';

// Common config shared between frontend and backend
const config = {
	output: {
		path: './build/',
		publicPath: './',
	},
	module: {
			loaders: [
				{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
				{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
			]
		},
		plugins: [
			new webpack.NoErrorsPlugin()
		],
		resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
}

// Config for client-side bundle (app.js)
const appConfig = merge({}, config, {
	entry: './src/app.js',
	output: {
		filename: 'app.js'
	}
});

// Config for server-side bundle (server.js)
const serverConfig = merge({}, config, {
	entry: './src/server.js',
	output: {
		filename: 'server.js',
		libraryTarget: 'commonjs2'
	},
	target: 'node',
	node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
	externals: /^[a-z][a-z\.\-0-9]*$/
});

module.exports = [appConfig, serverConfig];