const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const path = require('path')

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // use transpileOnly: true if heap out of memory
          { loader: 'ts-loader', options: { transpileOnly: true } }
        ],
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ]
        ]
      }
    ]
  },
  node: false,
  externals: [nodeExternals()],
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node'
}
