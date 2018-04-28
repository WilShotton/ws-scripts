// const { exec } = require('child_process')
// const { existsSync } = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')


// if (!existsSync(path.resolve(process.cwd(), 'src/index.js'))) {
//
//     console.error('`src/index.js` file does not exist.')
//     process.exit(1)
// }

// console.log('build', webpackConfig)

// console.log('build', webpack)

console.log('output', path.resolve(__dirname, '../dist'))
console.log('entry', path.resolve(__dirname, '../src/index.js'))

const compiler = webpack(webpackConfig, (err, stats) => {

    console.log('CB')

    // console.log(err)
    //
    console.log(
        stats.toString({
            colors: true
        })
    )
})


