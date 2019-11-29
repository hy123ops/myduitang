const path = require('path')

module.exports = {
  chainWebpack: config => {

    config.resolve.symlinks(true)

    config.resolve.alias
      .set('components', path.resolve(__dirname, './src/components'))
      .set('pages', path.resolve(__dirname, './src/pages'))
      .set('assets', path.resolve(__dirname, './src/assets'))
      .set('utils', path.resolve(__dirname, './src/utils'))

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },
  devServer: {
    proxy: {
      '/napi': {
        target: 'https://m.duitang.com',
        changeOrigin: true
      }
    }
  }
}