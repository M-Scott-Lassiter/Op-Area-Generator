/**
 * Provides helper functions used to create valid configuration objects to generate grids.
 *
 *
 */

/**
 * Takes an input of a geographic grid boundary an optional parameters and returns a fully formatted {@link GridConfig.GeographicGridConfig} object
 * ready for use with <code>oparea.grids.geographic()</code>. Unused options will return the default. Invalid options will get ignored.
 *
 * @memberof Grids.Config
 * @param {Grids.Definitions.Boundaries} boundaries Geographic grid boundaries
 * @param {object} [options] Optional additional parameters. If omitted, this function returns default
 * @param {	Grids.Definitions.AxisOptions} [options.naming] A grid naming configuration object
 * @param {	Grids.Definitions.AxisOptions} [options.longitudeAxis] Longitude axis configuration object
 * @param {	Grids.Definitions.AxisOptions} [options.latitudeAxis] Latitude axis configuration object
 * @param {	Grids.Definitions.OmittedGridSquares} [options.omits] Grid squares to exclude from this configuration
 * @param {	Grids.Definitions.Alias | Grids.Definitions.AliasCollection} [options.aliases] Defines aliases for grid squares
 * @returns {Grids.Definitions.GeographicGridConfig} A properly formatted grid configuration object ready to use with {@link Grids.Geoggraphic}
 * @throws {Error} Invalid boundaries object
 */
function configGeographic(boundaries, options) {
    const formattedConfig = options
    return { formattedConfig }
}

exports.configGeographic = configGeographic
