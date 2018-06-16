'use strict'

const path = require('path')


const projectRoot = process.cwd()

const resolveInProject = relativePath => path.resolve(projectRoot, relativePath)

const resolveInSelf = relativePath => path.resolve(__dirname, relativePath)

module.exports = {

    build: {
        entry: resolveInProject('src/index.js'),
        html: resolveInSelf('../templates/index.html'),
        output: resolveInProject('dist'),
        package: resolveInProject('package.json'),
        project: resolveInProject('project.json'),
        public: resolveInProject('public'),
        src: resolveInProject('src'),
        tsConfig: resolveInSelf('ts.config.json'),
        tsConfigTest: resolveInSelf('ts.config.test.json'),
    }
}
