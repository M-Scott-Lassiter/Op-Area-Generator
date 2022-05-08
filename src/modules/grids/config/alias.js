/**
 * Used to create a properly validated and formatted alias object.
 *
 * @memberof Grids.Config
 * @param {string} aliasName ID corresponding to a grid square. (e.g. 'A5', 'G22')
 * @param {string|string[]} refersToNames The grid square ID(s) or other aliases.
 * Duplicate strings will consolidate to a single value.
 * An alias name cannot correspond to itself.
 * @returns {Grids.Definitions.Alias} Properly formatted alias object
 * @throws {Error} Alias names cannot be null, undefined, or empty strings.
 * @example
 * const alias1 = alias('MANTA', 'A5') // { alias: 'MANTA', refersTo: ['A5'] }
 * const alias2 = alias('COFFEE', ['BLACK', 'ALIEN', 'G22']) // { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 * const alias3 = alias('COFFEE', ['BLACK', 'ALIEN', 'G22', 'BLACK']) // { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 * const alias4 = alias('RAY', ['COFFEE', 'MANTA', 'A6', 'B5', 'B6']) // { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }
 */
function alias(aliasName, refersToNames) {
    // Null inputs should throw an error
    if (aliasName === null || aliasName === undefined || aliasName === '') {
        throw new Error('Alias names and referrels cannot be null, undefined, or empty strings.')
    }

    // Ensure the refersToNames are contained in an array under all cases
    let processedArray = []
    if (Array.isArray(refersToNames)) {
        // Already in an array
        processedArray = refersToNames
    } else if (refersToNames) {
        // Only a single name
        processedArray.push(refersToNames)
    } else {
        // Passed a falsy value
        processedArray.push('')
    }

    // Remove duplicates
    processedArray = [...new Set(processedArray)]

    return { alias: aliasName, refersTo: processedArray }
}

exports.alias = alias
