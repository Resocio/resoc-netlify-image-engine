const path = require('path');

module.exports = {
  entry: './src/ui/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out'),
  },
  performance: { hints: false }
};
