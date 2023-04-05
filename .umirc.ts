import { defineConfig } from 'umi';

export default defineConfig({
  favicons: ['/favicon.ico'],
  jsMinifier: 'terser',
  routes: [{ path: '/', component: 'home', layout: false }],
  npmClient: 'npm',
  chainWebpack(config) {
    config.module
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
