const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HTMLWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
    },
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx']
	},
    module: {
      rules: [
        {
            test: /\.(ts|tsx)$/,
            exclude: /\.test.(ts|tsx)?$/,
            use: {
                loader: "awesome-typescript-loader?silent=true"
            }
        },
        {
			test: /\.styl$/,
            use: [
                {loader: 'style-loader'},
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
						modules: true,
						localIdentName: '[name]_[local]_[hash:base64]',
                        sourceMap: true,
						namedExport: true,
						camelCase: true
                    }
				},
				{loader: 'stylus-loader'}
            ]
        },
        {
            test: /\.(pdf|jpg|png|gif|svg|ico)$/,
            use: [
                {loader: 'url-loader'}
            ]
        }
      ]
    },
    plugins: [htmlPlugin]
  };