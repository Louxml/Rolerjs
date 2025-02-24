const path = require('path');

module.exports = {
  entry: {
    main:'./src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Roler',   // 定义全局命名空间
    libraryTarget: 'umd',      // 兼容各种环境
    globalObject: 'this', // 兼容浏览器和node环境
  },
  resolve: {
    alias: {
      '@roler/extensions': path.resolve(__dirname, 'src/extensions/'),
      '@roler/event-emitter': path.resolve(__dirname, 'src/eventemitter/'),
      '@roler/runner': path.resolve(__dirname, 'src/runner/'),
    }
  },
  mode: 'production',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: [
      path.join(__dirname, 'public'),
      path.join(__dirname, '.'),
    ],
  },
};
