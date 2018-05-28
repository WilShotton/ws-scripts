const path = require('path')


const projectRoot = process.cwd()

const resolveInProject = relativePath => path.resolve(projectRoot, relativePath)

const resolveInSelf = relativePath => path.resolve(__dirname, relativePath)

module.exports = {

    build: {
        entry: resolveInProject('src/index.js'),
        html: resolveInSelf('../templates/index.html'),
        output: resolveInProject('dist'),
        src: resolveInProject('src'),
        tsConfig: resolveInSelf('ts.config.json'),
    }
}
