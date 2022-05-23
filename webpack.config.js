const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'eslint-loader',
            options: { fix: true },
          },
        ],
        include: path.resolve(__dirname, './src/**/*.js'),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    // contentBase
    static: {
      directory: path.join(__dirname, 'public/'),
    },
    port: 3000,
    // publicPath
    devMiddleware: {
      publicPath: 'https://localhost:3000/dist/',
    },
    // hotOnly
    hot: 'only',
    historyApiFallback: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
