'use strict'

const paths = require('./paths')


module.exports = ({ host }) => {

    return {
        contentBase: paths.build.public,
        disableHostCheck: true,
        host,
        hot: true,
        stats: {
            children: false
        }
    }
}
