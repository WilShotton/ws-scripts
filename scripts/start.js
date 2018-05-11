process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const opn = require('opn')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.dev.config')
const webpackDevServerConfig = require('../config/webpack-dev-server.config')
const parseArgs = require('../utils/parse-args')


const args = parseArgs(process.argv)

const PORT = args.p || args.port || 3456
const HOST = '0.0.0.0'
const SIGNALS = ['SIGINT', 'SIGTERM']

const compiler = webpack(webpackConfig)

const devServer = new WebpackDevServer(compiler, webpackDevServerConfig({
    host: HOST
}))

devServer.listen(PORT, HOST, err => {

    if (err) {
        return console.log(err)
    }

    console.log(chalk.cyan(`Starting the development server on port ${PORT}...\n`))

    opn(`http://${HOST}:${PORT}`)
})

SIGNALS.forEach(function(sig) {
    process.on(sig, () => {
        devServer.close()
        process.exit()
    })
})
