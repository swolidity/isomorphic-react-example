import webpack from 'webpack';
import merge from 'lodash/object/merge';

// Common config shared between frontend and backend
const config = {
	output: {
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
	entry: [
		'bootstrap-webpack',
		'./src/app.js'
		],
	output: {
		path: './build/public',
		filename: 'app.js'
	},
	 module: {
    loaders: [
    	{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  }
});

// Config for server-side bundle (server.js)
const serverConfig = merge({}, config, {
	entry: './src/server.js',
	output: {
		path: './build',
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