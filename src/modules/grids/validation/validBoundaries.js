const helpers = require('../../../helpers')

/**
 * Validates a boundaries object for correct formatting.
 *
 * @memberof Grids.Validation
 * @see GridConfig.Boundaries for validity requirements.
 * @param {Grids.Definitions.Boundaries} boundariesToCheck A boundaries options object to check for validity
 * @returns {boolean} True if a valid boundaries object
 */
function validBoundaries(boundariesToCheck) {
    // Objects must have the exact required properties, or validation fails
    if (
        boundariesToCheck === null ||
        typeof boundariesToCheck !== 'object' ||
        !('west' in boundariesToCheck) ||
        !('south' in boundariesToCheck) ||
        !('east' in boundariesToCheck) ||
        !('north' in boundariesToCheck) ||
        Object.keys(boundariesToCheck).length > 4
    ) {
        return false
    }

    // The four required keys are present. Make sure they are actually numbers by iterating through each one
    const cardinalDirections = Object.keys(boundariesToCheck)
    for (let i = 0; i < cardinalDirections.length; i++) {
        const value = boundariesToCheck[cardinalDirections[i]]
        if (typeof value !== 'number' || helpers.valueEqualsNaN(value)) {
            return false
        }
    }

    // North and south boundaries cannot exceed the poles (90 degrees), and North must be greater than south
    if (
        boundariesToCheck.north > 90 ||
        boundariesToCheck.south < -90 ||
        boundariesToCheck.north <= boundariesToCheck.south
    ) {
        return false
    }

    // Eastern and western boundaries must be in the range of -180 to 180
    if (
        boundariesToCheck.east > 180 ||
        boundariesToCheck.east < -180 ||
        boundariesToCheck.west > 180 ||
        boundariesToCheck.west < -180
    ) {
        return false
    }

    // All validations passed, return true
    return true
}

exports.validBoundaries = validBoundaries
