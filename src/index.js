/* eslint-disable global-require */

const { validAlias } = require('./modules/grids/validation/validAlias')
const { validAliasCollection } = require('./modules/grids/validation/validAliasCollection')
const { validAxisOptions } = require('./modules/grids/validation/validAxisOptions')
const gridConfig = require('./modules/grids/grids.config')

const grids = {
    geographic: require('./modules/grids/grids.geographic'),
    config: gridConfig,
    validation: { validAlias, validAliasCollection, validAxisOptions }
}

exports.grids = grids
