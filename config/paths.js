const path = require('path')

const projectRoot = process.cwd()


const resolveInProject = relativePath => path.resolve(projectRoot, relativePath)

// const resolveSelfDirectory = relativePath => path.resolve(selfRoot, relativePath)


module.exports = {

    build: {
        entry: resolveInProject('src/index.js'),
        output: resolveInProject('build')
    }
}
