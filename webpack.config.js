const path = require('path');

module.exports = {
  entry: './src/ui/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'out'),
  },
};
