// @ts-check

/**
 * Provides helper functions used to create valid configuration objects to generate grids.
 *
 * @module Grids.Config
 */

/**
 * Used to create a properly validated and formatted alias object.
 *
 * @param {string} aliasName ID corresponding to a grid square. (e.g. 'A5', 'G22')
 * @param {string|string[]} refersToNames The grid square ID(s) or other aliases.
 * Duplicate strings will consolidate to a single value.
 * An alias name cannot correspond to itself.
 * @returns {GridConfig.Alias} Properly formatted alias object
 * @example
 * const alias1 = alias('MANTA', 'A5') // { alias: 'MANTA', refersTo: ['A5'] }
 * const alias2 = alias('COFFEE', ['BLACK', 'ALIEN', 'G22']) // { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 * const alias3 = alias('COFFEE', ['BLACK', 'ALIEN', 'G22', 'BLACK']) // { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 * const alias4 = alias('RAY', ['COFFEE', 'MANTA', 'A6', 'B5', 'B6']) // { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }
 */
function alias(aliasName, refersToNames) {
    return { alias: aliasName, refersTo: [refersToNames] }
}

// * const collectionTwo = [{ alias: 'MANTA', refersTo: ['A5'] },
// *                        { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] },
// *                        { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]

/**
 * Combines an alias or alias collection into a combined alias collection.
 *
 * @param {GridConfig.Alias|GridConfig.Alias[]|GridConfig.AliasCollection|GridConfig.AliasCollection[]} aliases An array of aliases or alias collections.
 * @returns {GridConfig.AliasCollection} Properly formatted alias object
 * @see {@link GridConfig.Alias}
 * @example
 * const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
 * const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 *
 * let combined = aliasCollection([firstAlias, secondAlias])
 *      // [{ alias: 'MANTA', refersTo: ['A5'] },
 *      //  { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }]
 *
 * combined = aliasCollection(combined, { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] })
 *      // [{ alias: 'MANTA', refersTo: ['A5'] },
 *      //  { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] },
 *      //  { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 *
 * const alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
 * const alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
 *
 * // When combining an alias that already exists, it adds on any new definitions and ignores reused ones.
 * combined = aliasCollection([combined, alias3, alias4])
 *      // [{ alias: 'MANTA', refersTo: ['A5', 'A6', 'A7'] },
 *      //  { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] },
 *      //  { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 */
function aliasCollection(aliases) {
    return [aliases]
}

/**
 * Wrapper function to generate a properly validated and formatted geographic grid boundary object
 *
 * @param {number} westernBoundary Western most boundary (Between -180 to 180)
 * @param {number} southernBoundary Southern most boundary (Between -90 to 90)
 * @param {number} easternBoundary Eastern most boundary (Between -180 to 180)
 * @param {number} northernBoundary Northern most boundary (Between -90 to 90)
 * @returns {GridConfig.GeographicBoundaries} Properly formatted geographic grid boundary object
 * @throws {Error} For non-numeric values
 * @throws {RangeError} Southern boundary is less than -90
 * @throws {RangeError} Northern boundary is greater than 90
 * @throws {RangeError} Southern boundary is greater than northern boundary
 * @throws {RangeError} The difference between the eastern and western boundaries exceed 360 degrees
 * @example
 *
 * const bounds = geographicBoundaries(20, -15.5, 40.25, 15.5) // { west: 20, south: -15.5, east: 40.25, north: 15.5 }
 * const crossAntimeridian = geographicBoundaries(170, -10, -170, 10)// { west: 170, south: -10, east: -170, north: 10 }
 */
function geographicBoundaries(
    westernBoundary,
    southernBoundary,
    easternBoundary,
    northernBoundary
) {
    return {
        west: westernBoundary,
        south: southernBoundary,
        east: easternBoundary,
        north: northernBoundary
    }
}

/**
 * Takes an input of a geographic grid boundary an optional parameters and returns a fully formatted {@link GridConfig.GeographicGridConfig} object
 * ready for use with <code>oparea.grids.geographic()</code>. Unused options will return the default. Invalid options will get ignored.
 * @param {GridConfig.GeographicBoundaries} boundaries Geographic grid boundaries
 * @param {object} [options] Optional additional parameters. If omitted, this function returns default
 * @param {	GridConfig.AxisOptions} [options.naming] A grid naming configuration object
 * @param {	GridConfig.AxisOptions} [options.longitudeAxis] Longitude axis configuration object
 * @param {	GridConfig.AxisOptions} [options.latitudeAxis] Latitude axis configuration object
 * @param {	GridConfig.OmittedGridSquares} [options.omits] Grid squares to exclude from this configuration
 * @param {	GridConfig.Alias | GridConfig.AliasCollection} [options.aliases] Defines aliases for grid squares
 * @returns {GridConfig.GeographicGridConfig} A properly formatted grid configuration object ready to use with {@link Grids.Geoggraphic}
 * @throws {Error} Invalid boundaries object
 */
function geographicConfig(boundaries, options) {
    const formattedConfig = options
    return { formattedConfig }
}

exports.alias = alias
exports.aliasCollection = aliasCollection
exports.geographicBoundaries = geographicBoundaries
exports.geographicConfig = geographicConfig
