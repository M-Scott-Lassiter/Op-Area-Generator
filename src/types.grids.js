// @ts-check

/**
 * All type definitions for configuring grids.
 *
 * @namespace GridConfig
 */

/**
 * Sets the parameters for grid naming and labeling when constructing a new grid area.
 *
 * @typedef {object} GridConfig.Naming
 * @memberOf GridConfig
 * @property {boolean} allowLowerCaseLetters=false Determines whether or not the grid letters may be lower case
 * @property {string} dictionary='ABCDEFGHIJKLMNOPQRSTUVWXYZ' Dictionary to use for the lettered axis
 * @property {boolean} numbersFirst=false If set to true, the grid square names will concatenate with the number before the letter (e.g. <code>'5B'</code>). Default is false (e.g. <code>'C7'</code>)
 * @property {number} numberPadding=0 Positive integer corresponding to leading zeros before the number. If <code>0</code> (default) then numbers will not be padded. (e.g. numberPadding=2 => <code>C007</code>)
 * @property {boolean} numericAxisOnHorizontal=false The numeric axis defaults to east/west. If set to true, the numeric axis will be north/south
 * @example
 * const nameObject = {
 *                         allowLowerCaseLetters: true,
 *                         dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
 *                         numbersFirst: false,
 *                         numberPadding: 0,
 *                         numericAxisOnHorizontal: false
 *                     }
 */

/**
 * Defines how an axis behaves.
 *
 * @typedef {object} GridConfig.AxisOptions
 * @memberOf GridConfig
 * @property {number} quantity=10 Positive integer that determines how many grid squares will be on this axis
 * @property {boolean} extendsPositive=true If true, numbers/letters get larger from south to north for the latitude axis, and west to east on the longitude axis.
 * Set to false to reverse these directions.
 * @example
 * axis1 = {quantity: 24, extendsPositive: false},
 * axis2 = {quantity: 15, extendsPositive: true},
 */

/**
 * An array of grid squares that will get omitted from the final grid definition.
 *
 * @typedef {string[]} GridConfig.OmittedGridSquares
 * @memberOf GridConfig
 * @example
 * const singleOmit = ['A5']
 * const multipleOmits = ['A5', 'C7', 'E10']
 */

/**
 * Used to define a code word (or alias) that corresponds to a particular grid square or range of grid squares.
 *
 * @typedef {object} GridConfig.Alias
 * @memberOf GridConfig
 * @property {string} alias The grid square id (e.g. <code>'A5'</code>)
 * @property {string[]} refersTo An array of unique strings corresponding to an alias for this grid square
 * @example
 * const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
 * const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 * const alias3 = { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }
 */

/**
 * A collection of unique alias itendifiers.
 *
 * @typedef {array} GridConfig.AliasCollection
 * @memberOf GridConfig
 * @property {GridConfig.Alias[]} aliases A consolidated array of one or more {@link GridConfig.Alias} objects for grid squares. There can only be one entry for each alias.
 * @example
 * const collectionOne = [{ alias: 'MANTA', refersTo: ['A5'] }]
 * const collectionTwo = [{ alias: 'MANTA', refersTo: ['A5'] },
 *                        { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] },
 *                        { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 */

/**
 * Defines the boundaries of a geographic grid. Northern and southern boundaries cannot exceed the poles (+90 and -90, respectively).
 * The northern boundary must be larger than the southern boundary.
 * The difference between the western and eastern boundaries cannot exceed 360 degrees.
 * For boundaries that cross the antimeridian, the western boundary will be greater than the eastern bounday.
 *
 * @typedef {object} GridConfig.GeographicBoundaries
 * @memberOf GridConfig
 * @property {number} west Western most boundary (Between -180 to 180)
 * @property {number} south Southern most boundary (Between -90 to 90)
 * @property {number} east Eastern most boundary (Between -180 to 180)
 * @property {number} north Northern most boundary (Between -90 to 90)
 * @example
 * const geographicBoundaries = { west: 20, south: -15.5, east: 40.25, north: 15.5 }
 * const crossingAntimeridian = { west: 170, south: -10, east: -170, north: 10 }
 */

/**
 * An object that defines all required configuration settings for creating a geographic grid.
 * Only the boundaries are required. If the other configuration objects are not included, then the geographic grid
 * will assume the defaults for each.
 *
 * @typedef {object} GridConfig.GeographicGridConfig
 * @memberOf GridConfig
 * @property {GridConfig.GeographicBoundaries} boundaries Define the boundaries for this grid configuration
 * @property {GridConfig.Naming} [naming] A grid naming configuration object
 * @property {GridConfig.AxisOptions} [longitudeAxis] Longitude axis configuration object
 * @property {GridConfig.AxisOptions} [latitudeAxis] Latitude axis configuration object
 * @property {GridConfig.OmittedGridSquares} [omits] Grid squares to exclude from this configuration
 * @property {GridConfig.Alias|GridConfig.AliasCollection} [aliases] Defines aliases for grid squares
 * @example
 * const simpleConfig = { boundaries: { west: 20, south: -15.5, east: 40.25, north: 15.5 } }
 *
 * const complex = {
 *                      boundaries: { west: 20, south: -15.5, east: 40.25, north: 15.5 },
 *                      naming: {
 *                                  numbersFirst: false,
 *                                  dictionary: 'ABCDEGH',
 *                                  numberPadding: 1,
 *                                  numericAxisOnHorizontal: true
 *                              },
 *                      longitudeAxis: {quantity: 17},
 *                      latitudeAxis: {quantity: 24, extendsPositive: false},
 *                      omits: ['A5', 'AC22', 'C7', 'E10'],
 *                      aliases: [{ alias: 'MANTA', refersTo: ['A5'] },
 *                                { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] },
 *                                { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 *                 }
 */
