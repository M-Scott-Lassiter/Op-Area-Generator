/**
 * Functions to generate GeoJSON grids.
 *
 * @namespace Grids
 */

/**
 * Provides helper functions used to create valid configuration objects to generate grids.
 *
 * @namespace Grids.Config
 */

/**
 * Provides validation methods for grid configuration objects.
 *
 * @namespace Grids.Definitions
 */

/**
 * Provides validation methods for grid configuration objects.
 *
 * @namespace Grids.Validation
 */

/**
 * Used to define a code word (or alias) that corresponds to a particular grid square or range of grid squares.
 * For validity, this object may only have these two properties and must follow the rules described below.
 *
 * @typedef {object} Alias
 * @memberof Grids.Definitions
 * @property {string} alias The alias id (e.g. <code>'MANTA'</code>). Must be any non-empty string.
 * @property {string[]} refersTo An array strings corresponding to grid IDs or other aliases. May be an empty array. Values must be unique.
 * @see Grids.Config.alias
 * @see Grids.Validation.validAlias
 * @example
 * const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
 * const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 * const alias3 = { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }
 */

/**
 * A collection of unique alias itendifiers.
 *
 * @typedef {Alias[]} AliasCollection
 * @memberof Grids.Definitions
 * @property {Grids.Definitions.Alias[]} aliases A consolidated array of one or more {@link Alias} objects for grid squares. There can only be one entry for each alias.
 * @see Grids.Config.aliasCollection
 * @see Grids.Validation.validAliasCollection
 * @example
 * const collectionOne = [{ alias: 'MANTA', refersTo: ['A5'] }]
 * const collectionTwo = [{ alias: 'MANTA', refersTo: ['A5'] },
 *                        { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] },
 *                        { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 */

/**
 * Defines how an axis behaves for a grid construction function.
 *
 * @typedef {object} AxisOptions
 * @memberof Grids.Definitions
 * @property {number} [quantity] Positive non-zero, non-infinite number that determines how many grid squares will be on this axis.
 * Grid construction functions will round decimals up to the next integer.
 * @property {boolean} [extendsPositive] If true, numbers/letters get larger from south to north (for a latitude axis), and west to east (for a longitude axis).
 * Set to false to reverse these directions.
 * @see Grids.Config.axisOptions
 * @see Grids.Validation.validAxisOptions
 * @example
 * // These are all valid axis objects. Omitted properties will cause grid construction functions to assume default values.
 * axis1 = {quantity: 24, extendsPositive: false},
 * axis2 = {quantity: 15, extendsPositive: true},
 * axis3 = {quantity: 10},
 * axis4 = {extendsPositive: true},
 * axis5 = {},
 */

/**
 * Defines the boundaries of a geographic grid. Northern and southern boundaries cannot exceed the poles (+90 and -90, respectively).
 * The northern boundary must be larger than the southern boundary.
 * The western and eastern boundaries must each be in the range of -180 to 180.
 * For boundaries that cross the antimeridian, the western boundary will be greater than the eastern bounday.
 *
 * @typedef {object} Boundaries
 * @memberof Grids.Definitions
 * @property {number} west Western most boundary (Between -180 to 180)
 * @property {number} south Southern most boundary (Between -90 to 90)
 * @property {number} east Eastern most boundary (Between -180 to 180)
 * @property {number} north Northern most boundary (Between -90 to 90)
 * @see Grids.Config.boundaries
 * @see Grids.Validation.validBoundaries
 * @example
 * const geographicBoundaries = { west: 20, south: -15.5, east: 40.25, north: 15.5 }
 * const crossingAntimeridian = { west: 170, south: -10, east: -170, north: 10 }
 */

/**
 * An object that defines all required configuration settings for creating a geographic grid.
 * Only the boundaries are required. If the other configuration objects are not included, then the geographic grid
 * will assume the defaults for each.
 *
 * @typedef {object} GeographicGridConfig
 * @memberof Grids.Definitions
 * @property {Grids.Definitions.Boundaries} boundaries Define the boundaries for this grid configuration
 * @property {Grids.Definitions.Naming} [naming] A grid naming configuration object
 * @property {Grids.Definitions.AxisOptions} [longitudeAxis] Longitude axis configuration object
 * @property {Grids.Definitions.AxisOptions} [latitudeAxis] Latitude axis configuration object
 * @property {Grids.Definitions.Omits} [omits] Grid squares to exclude from this configuration
 * @property {Grids.Definitions.Alias|Grids.Definitions.AliasCollection} [aliases] Defines aliases for grid squares
 * @see Grids.geographic
 * @see Grids.Config.configGeographic
 * @see Grids.Validation.validConfigGeographic
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

// exports.Grids = {}
// exports.Grids.Definitions = {}
// exports.Grids.Validation = {}
// exports.Grids.Config = {}
// exports.Grids.Definitions.Boundaries = {}

/**
 * Sets the parameters for grid naming and labeling when constructing a new grid area.
 *
 * @typedef {object} Naming
 * @memberof Grids.Definitions
 * @property {boolean} [allowLowerCaseLetters] Determines whether or not the grid letters may be lower case
 * @property {string} [dictionary] Dictionary to use for the lettered axis. Follows the validation rules found at {@link https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/blob/main/API.md#dictionary}
 * @property {boolean} [numbersFirst] If set to true, the grid square names will concatenate with the number before the letter (e.g. <code>'5B'</code>). Default is false (e.g. <code>'C7'</code>)
 * @property {number} [numberPadding] Positive integer between 0 and 10 corresponding to leading zeros before the number.
 * If <code>0</code> (default) then numbers will not be padded. (e.g. numberPadding=2 creates grid IDs such as <code>C007</code>).
 * This value is limited to 10 as a practical upper bounds. If passed a decimal, the grid configuration functions will round down to the nearest integer.
 * @property {boolean} [numericAxisOnHorizontal] The numeric axis defaults to east/west. If set to true, the numeric axis will be north/south
 * @see Grids.Config.naming
 * @see Grids.Validation.validNaming
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
 * An array of grid squares that will get omitted from the final grid definition. When configuring a grid, any grid ID that has a matching string in this array will get omitted.
 *
 * @typedef {string[]} Omits
 * @memberof Grids.Definitions
 * @see Grids.Validation.validOmits
 * @example
 * const singleOmit = ['A5']
 * const multipleOmits = ['A5', 'C7', 'E10']
 */

exports.unused = {}
