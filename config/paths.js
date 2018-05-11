const path = require('path')


const projectRoot = process.cwd()

const resolveInProject = relativePath => path.resolve(projectRoot, relativePath)

const resolveInSelf = relativePath => path.resolve(__dirname, relativePath)

module.exports = {

    build: {
        src: resolveInProject('src'),
        entry: resolveInProject('src/index.js'),
        html: resolveInSelf('../templates/index.html'),
        output: resolveInProject('dist')
    }
}
