const { validConfigGeographic } = require('../validation/validConfigGeographic')
const { axisOptions } = require('./axisOptions')
const { boundaries } = require('./boundaries')
const { naming } = require('./naming')

/**
 * Takes an optional object input of the various parameters required for a valid geographic grid configuration and returns a fully
 * formatted {@link GridConfig.GeographicGridConfig} object ready for use with <code>oparea.grids.geographic()</code>.
 * Any parameters left empty will return the default values for each data set. Invalid options will throw an error.
 *
 * @memberof Grids.Config
 * @param {object} [options] Optional additional parameters. If omitted, this function returns default
 * @param {       Grids.Definitions.Boundaries} options.boundaries Geographic grid boundaries. This property is required if options are included
 * @param {       Grids.Definitions.Naming} [options.naming] A grid naming configuration object
 * @param {       Grids.Definitions.AxisOptions} [options.longitudeAxis] Longitude axis configuration object
 * @param {       Grids.Definitions.AxisOptions} [options.latitudeAxis] Latitude axis configuration object
 * @param {       Grids.Definitions.Omits} [options.omits] Grid squares to exclude from this configuration
 * @param {       Grids.Definitions.Alias | Grids.Definitions.AliasCollection} [options.aliases] Defines aliases for grid squares
 * @returns {Grids.Definitions.GeographicGridConfig} A properly formatted grid configuration object ready to use with {@link Grids.Geographic}
 * @throws {Error} Invalid boundaries object | Invalid naming object | Invalid longitudeAxis object | Invalid latitudeAxis object |
 * Invalid omits object | Invalid alias or aliasCollection object
 * @throws {RangeError} Minimum latitude and longitude spacing must be at least 1 arc second
 */
function configGeographic(options) {
    const formattedConfig = { ...options }

    formattedConfig.boundaries = formattedConfig?.boundaries ?? boundaries()
    formattedConfig.naming = formattedConfig?.naming ?? naming()
    formattedConfig.longitudeAxis = formattedConfig?.longitudeAxis ?? axisOptions()
    formattedConfig.latitudeAxis = formattedConfig?.latitudeAxis ?? axisOptions()
    formattedConfig.omits = formattedConfig?.omits ?? []
    formattedConfig.aliases = formattedConfig?.aliases ?? []

    // Calling the function with no argument should return a default object. Otherwise, the options must be valid.
    if (options === undefined) {
        return formattedConfig
    }
    if (typeof options !== 'object' || Array.isArray(options) || options === null) {
        throw new Error('Options must be an object with valid grid definition properties')
    }

    // Validation
    if (!validConfigGeographic(options)) {
        throw new Error('Options must be an object with valid grid definition properties')
    }

    return formattedConfig
}

exports.configGeographic = configGeographic
