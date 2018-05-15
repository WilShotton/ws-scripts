'use strict'

const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
    babelrc: false,
    presets: [require.resolve('./babel.config')],
})
