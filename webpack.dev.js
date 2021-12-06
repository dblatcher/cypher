const path = require('path');
const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
   },
});