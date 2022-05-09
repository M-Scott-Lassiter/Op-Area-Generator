/* eslint-disable global-require */

const { validAlias } = require('./modules/grids/validation/validAlias')
const { validAliasCollection } = require('./modules/grids/validation/validAliasCollection')
const { validAxisOptions } = require('./modules/grids/validation/validAxisOptions')
const { validBoundaries } = require('./modules/grids/validation/validBoundaries')
const { validOmits } = require('./modules/grids/validation/validOmits')
const gridConfig = require('./modules/grids/grids.config')

exports.grids = {
    geographic: require('./modules/grids/grids.geographic'),
    config: gridConfig,
    validation: {
        validAlias,
        validAliasCollection,
        validAxisOptions,
        validBoundaries,
        validOmits
    }
}
