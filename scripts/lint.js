const { CLIEngine } = require('eslint')
const config = require('../config/eslint-config')
const paths = require('../config/paths')


const engine = new CLIEngine({
    cwd: process.cwd(),
    baseConfig: config,
    useEslintrc: false,
    fix: false,
})

const report = engine.executeOnFiles([paths.build.src])

const formatter = CLIEngine.getFormatter()
const output = formatter(report.results)

console.log(output)

if (report.errorCount > 0) {
    process.exit(1)
}
