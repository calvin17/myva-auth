const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  entry: './src/index',
  devtool: 'source-map',
  // output: {
  //   publicPath: 'http://localhost:8084/',
  // },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          output: {
            comments: false,
          },
          sourceMap: true, 
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8084,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: true,
    // historyApiFallback: {
    //   index: 'index.html',
    // },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthIndex': './src/App.js',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
