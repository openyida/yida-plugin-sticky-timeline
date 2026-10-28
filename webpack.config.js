'use strict';
const path = require('node:path');
const { container } = require('webpack');

module.exports = () => {
  const pluginId = process.env.YIDA_PLUGIN_ID;
  if (!/^PLUGIN-[A-Za-z0-9]+$/.test(pluginId || '')) {
    throw new Error('请设置平台实际创建的 YIDA_PLUGIN_ID=PLUGIN-xxx，容器名从真实 ID 派生');
  }
  return {
    entry: {},
    output: {
      path: path.resolve(__dirname, 'dist/plugin'),
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: 'auto',
      uniqueName: pluginId.slice(7),
      clean: true,
    },
    externals: { react: 'React' },
    devtool: false,
    plugins: [new container.ModuleFederationPlugin({
      name: pluginId.slice(7),
      library: { type: 'window', name: pluginId.slice(7) },
      filename: 'remoteEntry.js',
      exposes: {
        './app/custom-page': './src/app-custom-page.js',
        './designer/custom-page': './src/designer-custom-page.js',
      },
    })],
  };
};
