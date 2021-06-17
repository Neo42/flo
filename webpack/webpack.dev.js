const path = require('path')
const {merge} = require('webpack-merge')

const config = require('./webpack.common')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    writeToDisk: true,
    port: 3000,
  },
  output: {
    path: path.resolve(__dirname, '../public'),
  },
})
