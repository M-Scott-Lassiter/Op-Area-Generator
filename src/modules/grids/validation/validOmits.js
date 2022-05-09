/**
 * Validates a boundaries object for correct formatting.
 *
 * @memberof Grids.Validation
 * @see GridConfig.Boundaries for validity requirements.
 * @param {Grids.Definitions.Boundaries} omitArrayToCheck A boundaries options object to check for validity
 * @returns {boolean} True if a valid boundaries object
 */
function validOmits(omitArrayToCheck) {
    // Input must be an array, or validation fails
    if (!Array.isArray(omitArrayToCheck)) {
        return false
    }

    // Now that it is verified an array, iterate through and make sure all entries are non-empty strings
    for (let i = 0; i < omitArrayToCheck.length; i++) {
        if (typeof omitArrayToCheck[i] !== 'string' || !omitArrayToCheck[i]) {
            // the !omitArrayToCheck[i] accounts for empty strings
            return false
        }
    }

    // All validations passed, return true
    return true
}

exports.validOmits = validOmits
