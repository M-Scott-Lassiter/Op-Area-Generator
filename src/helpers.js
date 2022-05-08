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

exports.toArray = toArray
exports.uniqueArray = uniqueArray
