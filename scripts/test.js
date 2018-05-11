const jest = require('jest')


// "test": "jest --config=./jest/config.js --watch --testResultsProcessor="
// "test:ci": "jest --no-cache --config=./jest.config.js",
// "test:coverage": "jest --config=./jest.config.js --coverage",

jest.run([].concat(
    ...process.argv.slice(2),
    '--config',
    JSON.stringify(require('../config/jest.config')())
))
