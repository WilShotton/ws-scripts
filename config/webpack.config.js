const paths = require('./paths')


module.exports = {
    output: {
        filename: 'index.js',
        path: paths.build.output
    },
    entry: paths.build.entry,
    mode: 'production'
}
