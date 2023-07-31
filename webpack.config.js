const path = require('path')

module.exports = {
  entry: './pages/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
