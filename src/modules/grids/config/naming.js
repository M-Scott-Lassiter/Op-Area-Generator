const AlphanumericEncoder = require('alphanumeric-encoder')
const helpers = require('../../../helpers')

const encoder = new AlphanumericEncoder()

/**
 * Used to create a properly validated and formatted grid naming object.
 *
 * @memberof Grids.Config
 * @param {boolean} [allowLowerCaseLetters=false] Controls whether the grid squares will differentiate between lower case and upper case letters
 * @param {string} [dictionary='ABCDEFGHIJKLMNOPQRSTUVWXYZ'] Dictionary to use when creating the grid squares. Follow validation guidance of {@link Grids.Definitions.Naming}
 * @param {boolean} [numbersFirst=false] If set to true, the grid square names will concatenate with the number before the letter (e.g. <code>'5B'</code>)
 * @param {number} [numberPadding=0] Positive integer between 0 and 10 corresponding to leading zeros before the number.
 * If <code>0</code> (default) then numbers will not be padded. (e.g. numberPadding=2 creates grid IDs such as <code>C007</code>).
 * This value is limited to 10 as a practical upper bounds. If passed a decimal, the grid configuration functions will round down to the nearest integer.
 * @param {boolean} [numericAxisOnHorizontal=false] The numeric axis defaults to east/west. If set to true, the numeric axis will be north/south
 * @returns {Grids.Definitions.Naming} Propertly formatted grid naming object
 * @throws {Error} <code>dictionary</code> contains characters other than lower case or upper case letters
 * @throws {RangeError} <code>numberPadding</code> less than 0 or more than 10
 * @example
 *
 * const newName1 = oparea.grids.config.naming()
 * const newName2 = oparea.grids.config.naming(true, 'ABCabc')
 * const newName3 = oparea.grids.config.naming(false, 'ABCXYZ', true, 1, true)
 */
function naming(
    allowLowerCaseLetters = false,
    dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbersFirst = false,
    numberPadding = 0,
    numericAxisOnHorizontal = false
) {
    // Dictionary cannot have numbers.

    if (/\d/.test(dictionary)) {
        throw new Error('Dictionary values cannot contain numbers')
    }

    // Dictionary cannot have other invalid names. Rely on the AlphanumericEncoder class for this.

    try {
        encoder.dictionary = dictionary
    } catch (error) {
        throw new Error(
            'Dictionary contains invalid characters. It may only have non-repeated letters.'
        )
    }

    if (
        typeof numberPadding !== 'number' ||
        numberPadding < 0 ||
        numberPadding > 10 ||
        helpers.valueEqualsNaN(numberPadding)
    ) {
        throw new RangeError('numberPadding must be a number between 0 and 10.')
    }

    return {
        allowLowerCaseLetters: !!allowLowerCaseLetters, // !! operator forces truthy/falsy values to a boolean
        dictionary,
        numbersFirst: !!numbersFirst,
        numberPadding,
        numericAxisOnHorizontal: !!numericAxisOnHorizontal
    }
}

exports.naming = naming
