/**
 * Takes any input or array of inputs and returns an array.
 *
 * @private
 * @ignore
 * @param {any|any[]} arrayOrValue Value or array to convert to array
 * @returns {any[]} Consolidated array
 */
function toArray(arrayOrValue) {
    if (Array.isArray(arrayOrValue)) {
        // Already in an array
        return arrayOrValue
    }
    return [arrayOrValue]
}

/**
 * Takes an array and checks if it has only unique values
 *
 * @private
 * @ignore
 * @param {any[]} arrayToTest Array of any values
 * @returns {boolean} True if array contains only unique values
 */
function uniqueArray(arrayToTest) {
    const uniqueAliases = [...new Set(arrayToTest)]
    if (uniqueAliases.length === arrayToTest.length) {
        return true
    }
    return false
}

/**
 * This unusual comparison is used to handle the edge case of NaN by comparing an object to itself. Only NaN does not equal itself.
 *
 * @see {@link https://stackoverflow.com/a/16988441/6186333}
 * @private
 * @ignore
 * @param {any} valueToTest Any value, object, or type
 * @returns {boolean} True if value was literally NaN, false in all other cases
 */
function valueEqualsNaN(valueToTest) {
    // eslint-disable-next-line no-self-compare
    return valueToTest !== valueToTest
}

exports.toArray = toArray
exports.uniqueArray = uniqueArray
exports.valueEqualsNaN = valueEqualsNaN
