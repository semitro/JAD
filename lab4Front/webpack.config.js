const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
					sourceMap: true,
					importLoaders: 1,
					localIdentName: "[name]--[local]--[hash:base64:8]"
				}
			},
			//~ {
                //~ loader: "sass-loader", // compiles Sass to CSS
                //~ options: {
					//~ data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";'
				//~ }
            //~ },
			"postcss-loader"
        ]
      },
      
    ]
  },
  plugins: [
	 // new CleanWebpackPlugin(['dist']),
  ],
  
};
