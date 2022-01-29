module.exports = {
  //baseUrl: '/',
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module.rules.delete('eslint');
  },
};
