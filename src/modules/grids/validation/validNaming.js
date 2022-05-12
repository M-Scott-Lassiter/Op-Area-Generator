const AlphanumericEncoder = require('alphanumeric-encoder')
const helpers = require('../../../helpers')

const encoder = new AlphanumericEncoder()

/**
 * Validates a grid naming object for correct formatting.
 *
 * @memberof Grids.Validation
 * @param {Grids.Definitions.Naming} namingObjectToCheck A boundaries options object to check for validity
 * @returns {boolean} True if a valid boundaries object
 */
function validNaming(namingObjectToCheck) {
    // Only objects will validate
    if (typeof namingObjectToCheck !== 'object' || namingObjectToCheck === null) {
        return false
    }

    // Only five keys may exist:
    //   'allowLowerCaseLetters', 'dictionary', 'numbersFirst', 'numberPadding', 'numericAxisOnHorizontal' or any combination
    const keys = Object.keys(namingObjectToCheck)
    for (let i = 0; i < keys.length; i++) {
        if (
            !(
                keys[i] === 'allowLowerCaseLetters' ||
                keys[i] === 'dictionary' ||
                keys[i] === 'numbersFirst' ||
                keys[i] === 'numberPadding' ||
                keys[i] === 'numericAxisOnHorizontal' ||
                keys[i] === 'gridSystemID'
            )
        ) {
            return false
        }
    }

    // Check that allowLowerCaseLetters, if present, is a boolean value. If not, this object is invalid.
    if (
        'allowLowerCaseLetters' in namingObjectToCheck &&
        !(
            namingObjectToCheck.allowLowerCaseLetters === true ||
            namingObjectToCheck.allowLowerCaseLetters === false
        )
    ) {
        return false
    }

    // Check that numbersFirst, if present, is a boolean value. If not, this object is invalid.
    if (
        'numbersFirst' in namingObjectToCheck &&
        !(namingObjectToCheck.numbersFirst === true || namingObjectToCheck.numbersFirst === false)
    ) {
        return false
    }

    // Check that allowLowerCaseLetters, if present, is a boolean value. If not, this object is invalid.
    if (
        'numericAxisOnHorizontal' in namingObjectToCheck &&
        !(
            namingObjectToCheck.numericAxisOnHorizontal === true ||
            namingObjectToCheck.numericAxisOnHorizontal === false
        )
    ) {
        return false
    }

    // numberPadding must be numeric between 0 and 10. This puts a practical limit on it.
    if (
        'numberPadding' in namingObjectToCheck &&
        (typeof namingObjectToCheck.numberPadding !== 'number' ||
            helpers.valueEqualsNaN(namingObjectToCheck.numberPadding) ||
            namingObjectToCheck.numberPadding < 0 ||
            namingObjectToCheck.numberPadding > 10)
    ) {
        return false
    }

    // Dictionary cannot have numbers.
    if (/\d/.test(namingObjectToCheck.dictionary)) {
        return false
    }

    // Dictionary cannot have other invalid names. Rely on the AlphanumericEncoder class for this.
    if ('dictionary' in namingObjectToCheck) {
        try {
            encoder.dictionary = namingObjectToCheck.dictionary
        } catch (error) {
            return false
        }
    }

    // gridSystemID must be a string of any length or content
    if (
        'gridSystemID' in namingObjectToCheck &&
        typeof namingObjectToCheck.gridSystemID !== 'string'
    ) {
        return false
    }

    // All validations passed, return true
    return true
}

exports.validNaming = validNaming
