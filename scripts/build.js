'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config/webpack.build.config')
const paths = require('../config/paths')


fs.copySync(paths.build.public, paths.build.output, {
    dereference: true
})

webpack(config, (err, stats) => {

    console.log(err)

    if (stats) {
        console.log(stats.toString({ colors: true }))
    }
})
