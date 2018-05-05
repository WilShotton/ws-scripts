const path = require('path')

const projectRoot = process.cwd()


const resolveInProject = relativePath => path.resolve(projectRoot, relativePath)

const resolveInSelf = relativePath => path.resolve(__dirname, relativePath)


console.log('__dirname', __dirname)

module.exports = {

    build: {
        cssContext: resolveInProject('src'),
        entry: resolveInProject('src/index.js'),
        html: resolveInSelf('../templates/index.html'),
        output: resolveInProject('dist')
    }
}
