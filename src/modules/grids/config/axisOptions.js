const helpers = require('../../../helpers')

/**
 * Used to create a properly validated and formatted axisOptions object.
 *
 * @memberof Grids.Config
 * @param {number} [numGridAxisDivisions=10] Number of divisions an axis will be split into. Coerces any positive, non-zero, non-infinite numeric value to an integer
 * @param {boolean} [extendAxisPositive=true] Whether an axis will extend in the positive or negative direction.
 * Accepts any truthy or falsy statement and coerces it to a boolean
 * @returns {Grids.Definitions.AxisOptions} Properly formatted axis options object
 * @throws {Error} Grid divisions must be coercible to a positive non-zero number.
 * @example
 * const axis1 = axisOptions(20, false) // { quantity: 20, extendsPositive: false }
 * const axis2 = axisOptions(5.1, true) // { quantity: 6, extendsPositive: true }
 * const axis3 = axisOptions(10, 'ABC') // { quantity: 10, extendsPositive: true }
 * const axis4 = axisOptions() // { quantity: 10, extendsPositive: true }
 * const axis5 = axisOptions(0) // Throws error
 */
function axisOptions(numGridAxisDivisions = 10, extendAxisPositive = true) {
    // Null inputs should throw an error
    if (
        typeof numGridAxisDivisions !== 'number' ||
        numGridAxisDivisions === Infinity ||
        numGridAxisDivisions <= 0 ||
        helpers.valueEqualsNaN(numGridAxisDivisions)
    ) {
        throw new Error('Grid divisions must be coercible to a positive non-zero number.')
    }

    return {
        quantity: Math.ceil(numGridAxisDivisions), // Force any decimal values up to the next heighest integer
        extendsPositive: !!extendAxisPositive // !! operator forces truthy/falsy values to a boolean
    }
}

exports.axisOptions = axisOptions
