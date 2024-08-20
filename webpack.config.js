const path = require('path');

module.exports = {
  entry: './src/client.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig-legacy.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};