const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      })
    ],
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  },

  transpileDependencies: true

})
