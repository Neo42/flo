const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const appDir = path.join(__dirname, '../app')
const stylesDir = path.join(__dirname, '../styles')
const sharedDir = path.join(__dirname, '../shared')
const nodeDir = 'node_modules'

module.exports = {
  entry: [path.join(appDir, 'index.js'), path.join(stylesDir, 'index.scss')],
  resolve: {
    modules: [appDir, stylesDir, sharedDir, nodeDir],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT,
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './shared', to: ''}],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', {interlaced: true}],
          ['jpegtran', {progressive: true}],
          ['optipng', {optimizationLevel: 8}],
        ],
      },
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|webp)$/,
        loader: 'file-loader',
        options: {
          name: () => '[hash].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
          },
        ],
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
