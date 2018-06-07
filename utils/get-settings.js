const fs = require('fs')
const paths = require('../config/paths')


module.exports = (base = {}) => fs.existsSync(paths.build.project)

    ? {
        ...base,
        ...require(paths.build.project)
    }

    : base
