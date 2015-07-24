import webpack from 'webpack';
import merge from 'lodash/object/merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Common config shared between frontend and backend
const config = {
  output: {
    publicPath: './',
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss']
  }
}

// Config for client-side bundle (app.js)
const appConfig = merge({}, config, {
  entry: [
    'bootstrap-sass!./bootstrap-sass.config.js',
    './src/app.js'
    ],
  output: {
    path: './build/public',
    filename: 'app.js'
  },
   module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   	loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  	loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    	loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    	loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    	loader: "url?limit=10000&minetype=image/svg+xml" },
      { test: /\.scss$/,												loader: ExtractTextPlugin.extract(
                                                'css!sass?sourceMap',
                                                {
                                                  publicPath: './build/public/'
                                                }) }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       }),
    new ExtractTextPlugin('style.css', {
            allChunks: true
        })
  ]
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
  externals: /^[a-z][a-z\.\-0-9]*$/,
  module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop')
  ]
});

module.exports = [appConfig, serverConfig];
