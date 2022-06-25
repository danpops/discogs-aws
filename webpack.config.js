const path = require('path')
const slsw = require('serverless-webpack')
const stage = slsw.lib.options.stage

module.exports = {
  entry: slsw.lib.entries,
  externals: [{ 'aws-sdk': 'commonjs2 aws-sdk' }],
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  stats: 'minimal',
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
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  optimization: {
    minimize: stage === 'prod'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
}
