const path = require('path');
const webpack = require('webpack');

module.exports = {
  // ...existing configuration...
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
    store: 'pack',
    compression: 'gzip',
    name: 'my-cache',
    version: '1.0',
    managedPaths: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'typeof window': JSON.stringify('object'),
    }),
  ],
};
