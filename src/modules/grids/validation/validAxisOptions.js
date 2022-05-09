const helpers = require('../../../helpers')

/**
 * Validates an axis options object for correct formatting.
 *
 * @memberof Grids.Validation
 * @see GridConfig.AxisOptions for validity requirements.
 * @param {Grids.Definitions.AxisOptions} axisOptionsToCheck An axis options object to check for validity
 * @returns {boolean} True if a valid axis options object
 */
function validAxisOptions(axisOptionsToCheck) {
    // Only objects will validate
    if (typeof axisOptionsToCheck !== 'object' || axisOptionsToCheck === null) {
        return false
    }

    // Only two keys may exist: 'quantity', 'extendsPositive', or both
    const keys = Object.keys(axisOptionsToCheck)
    for (let i = 0; i < keys.length; i++) {
        if (!(keys[i] === 'extendsPositive' || keys[i] === 'quantity')) {
            return false
        }
    }

    // Check that quantity, if present, is a non-zero and non-infinite number. If not, this object is invalid.
    if (
        ('quantity' in axisOptionsToCheck && typeof axisOptionsToCheck.quantity !== 'number') ||
        axisOptionsToCheck.quantity <= 0 ||
        axisOptionsToCheck.quantity === Infinity ||
        // eslint-disable-next-line no-self-compare
        helpers.valueEqualsNaN(axisOptionsToCheck.quantity)
    ) {
        return false
    }

    // Check that extendsPositive, if present, is a boolean value. If not, this object is invalid.
    if (
        'extendsPositive' in axisOptionsToCheck &&
        !(
            axisOptionsToCheck.extendsPositive === true ||
            axisOptionsToCheck.extendsPositive === false
        )
    ) {
        return false
    }

    // All validations passed, return true
    return true
}

exports.validAxisOptions = validAxisOptions
