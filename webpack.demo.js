'use strict';
const path = require('node:path');
module.exports = {
  entry: './demo/index.js',
  output: { path: path.resolve(__dirname, 'dist/demo'), filename: 'demo.js', clean: true },
  devtool: false,
};
