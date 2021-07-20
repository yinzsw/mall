module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'SuperMall'
      return args
    })
  }
}
