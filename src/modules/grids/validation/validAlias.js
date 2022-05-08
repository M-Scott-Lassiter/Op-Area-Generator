const helpers = require('../../../helpers')

/**
 * Validates an alias object for correct formatting.
 *
 * @memberof Grids.Validation
 * @see GridConfig.Alias for validity requirements.
 * @param {Grids.Definitions.Alias} aliasToCheck An alias object to check for validity
 * @returns {boolean} True if a valid alias object
 */
function validAlias(aliasToCheck) {
    // Only objects will validate
    if (typeof aliasToCheck !== 'object' || aliasToCheck === null) {
        return false
    }

    // Only two keys may exist: 'alias' and 'refersTo'
    if (
        !(
            'alias' in aliasToCheck &&
            'refersTo' in aliasToCheck &&
            Object.keys(aliasToCheck).length === 2
        )
    ) {
        return false
    }

    // Check for invalid alias values
    if (typeof aliasToCheck.alias !== 'string' || aliasToCheck.alias === '') {
        return false
    }

    // Check for valid refersTo values
    if (!Array.isArray(aliasToCheck.refersTo)) {
        return false
    }

    // Check for duplicate entries in the refersTo
    if (!helpers.uniqueArray(aliasToCheck.refersTo)) {
        return false
    }

    // All validations passed, return true
    return true
}

exports.validAlias = validAlias
