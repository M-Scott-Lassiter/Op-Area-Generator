/* eslint-disable global-require */

const { validAlias } = require('./modules/grids/validation/validAlias')
const { validAliasCollection } = require('./modules/grids/validation/validAliasCollection')
const gridConfig = require('./modules/grids/grids.config')

const grids = {
    geographic: require('./modules/grids/grids.geographic'),
    config: gridConfig,
    validation: { validAlias, validAliasCollection }
}

exports.grids = grids
