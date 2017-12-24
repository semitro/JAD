const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
	  index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      {
        test: /\.css$/, use: [
			"style-loader",
			{
				loader: "css-loader",
				options: {
					modules: true, // default is false
					importLoaders: 1,
					localIdentName: "[name]--[local]--[hash:base64:8]"
				}
			},
			"postcss-loader"
        ]
      },

    ]
  },
  plugins: [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
  	}),
	new UglifyJsPlugin({
		parallel: true
	})
  ],

};
