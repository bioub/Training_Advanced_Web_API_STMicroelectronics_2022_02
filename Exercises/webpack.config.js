const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
  entry: './frontend/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
    }),
    new CopyPlugin({
      patterns: [{
        from: 'public'
      }]
    }),
    new InjectManifest({
      swSrc: './frontend/sw.js'
    }),
  ],
};

module.exports = config;