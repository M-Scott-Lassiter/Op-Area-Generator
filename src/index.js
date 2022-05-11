/* eslint-disable global-require */

const { validAlias } = require('./modules/grids/validation/validAlias')
const { validAliasCollection } = require('./modules/grids/validation/validAliasCollection')
const { validAxisOptions } = require('./modules/grids/validation/validAxisOptions')
const { validBoundaries } = require('./modules/grids/validation/validBoundaries')
const { validConfigGeographic } = require('./modules/grids/validation/validConfigGeographic')
const { validOmits } = require('./modules/grids/validation/validOmits')
const { validNaming } = require('./modules/grids/validation/validNaming')
const gridConfig = require('./modules/grids/grids.config')

exports.grids = {
    geographic: require('./modules/grids/grids.geographic'),
    config: gridConfig,
    validation: {
        validAlias,
        validAliasCollection,
        validAxisOptions,
        validConfigGeographic,
        validBoundaries,
        validOmits,
        validNaming
    }
}
