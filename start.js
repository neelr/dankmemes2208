var Jimp = require('jimp');
require('@babel/register')({
  presets: ['@babel/preset-env']
})

module.exports = require('./server.js')