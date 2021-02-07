module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx', { pragma: 'createElement' }
              ]
            ]
          }
        }
      },
      {

      }
    ]
  }
}