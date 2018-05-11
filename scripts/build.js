const webpack = require('webpack')
const config = require('../config/webpack.build.config')


webpack(config, (err, stats) => {

    console.log(err)

    if (stats) {
        console.log(stats.toString({ colors: true }))
    }
})
