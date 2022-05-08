const helpers = require('../../../helpers')
const { validAlias } = require('./validAlias')

/**
 * Validates an aliasCollection object for correct formatting.
 *
 * @memberof Grids.Validation
 * @see GridConfig.AliasCollection for validity requirements.
 * @param {Grids.Definitions.Alias|Grids.Definitions.AliasCollection} aliasCollectionToCheck An alias object to check for validity
 * @returns {boolean} True if a valid alias object
 */
function validAliasCollection(aliasCollectionToCheck) {
    // Normalize the input to an array so it can get looped through
    const processedArray = helpers.toArray(aliasCollectionToCheck)

    // Loop through each provided alias and check it for validity. If any are invalid on their own,
    //      the whole aliasCollection is invalid. Collect the aliases while looping.
    const aliasList = []
    for (let i = 0; i < processedArray.length; i++) {
        if (!validAlias(processedArray[i])) {
            return false
        }
        aliasList.push(processedArray[i].alias)
    }

    // Use the set operator to get unique aliases. If this new array is not the same length as the
    //      old array, then there was a duplicate alias key, and this collection is invalid.
    if (!helpers.uniqueArray(aliasList)) {
        return false
    }

    // All validations passed, return true
    return true
}

exports.validAliasCollection = validAliasCollection
