const helpers = require('../../../helpers')

/**
 * Wrapper function to generate a properly validated and formatted geographic grid boundary object.
 * Calling this function without providing any arguments will return a default object.
 * For boundaries that cross the antimeridian, the western boundary will be greater than the eastern bounday.
 *
 * @memberof Grids.Config
 * @param {number} [western=-10] Western most boundary (Between -180 to 180)
 * @param {number} [southern=-20] Southern most boundary (Between -90 to 90)
 * @param {number} [eastern=10] Eastern most boundary (Between -180 to 180)
 * @param {number} [northern=20] Northern most boundary (Between -90 to 90)
 * @returns {Grids.Definitions.Boundaries} Properly formatted geographic grid boundary object
 * @throws {Error} For non-numeric values
 * @throws {RangeError} Southern boundary is less than -90; |
 * Northern boundary is greater than 90; |
 * Southern boundary is greater than northern boundary; |
 * Eastern or western boundary is less than -180 or greater than 180
 * @example
 * const bounds1 = boundaries() // { west: -10, south: -20, east: 10, north: 20 }
 * const bounds2 = boundaries(-50, -35) // { west: -50, south: -35, east: 10, north: 20 }
 * const bounds3 = boundaries(20, -15.5, 40.25, 15.5) // { west: 20, south: -15.5, east: 40.25, north: 15.5 }
 * const crossAntimeridian = boundaries(170, -10, -170, 10)// { west: 170, south: -10, east: -170, north: 10 }
 */
function boundaries(western = -10, southern = -20, eastern = 10, northern = 20) {
    // Validation
    /**
     * A function common to each boundary definition to ensure it meets type validity requirements.
     *
     * @private
     * @ignore
     * @param {*} boundaryNumber One of the four boundary numbers provided above.
     */
    function evaluateValidity(boundaryNumber) {
        if (typeof boundaryNumber !== 'number' || helpers.valueEqualsNaN(boundaryNumber)) {
            throw new Error('Boundary numbers entries must be coercible to a number.')
        }
    }

    evaluateValidity(western)
    evaluateValidity(southern)
    evaluateValidity(eastern)
    evaluateValidity(northern)

    // North and south boundaries cannot exceed the poles (90 degrees), and North must be greater than south
    if (northern > 90 || southern < -90 || northern <= southern) {
        throw new Error('Northern and southern boundaries cannot exceed 90 or -90, respectively.')
    }

    if (northern <= southern) {
        throw new Error('Northern boundary must be greater than southern boundary.')
    }

    // Eastern and western boundaries must be in the range of -180 to 180
    if (eastern > 180 || eastern < -180 || western > 180 || western < -180) {
        throw new Error('Eastern and western boundaries must be between -180 and 180.')
    }

    return {
        west: western,
        south: southern,
        east: eastern,
        north: northern
    }
}

exports.boundaries = boundaries
