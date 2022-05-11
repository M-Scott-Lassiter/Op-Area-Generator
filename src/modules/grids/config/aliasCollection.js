const helpers = require('../../../helpers')
const { validAlias } = require('../validation/validAlias')
const { validAliasCollection } = require('../validation/validAliasCollection')
/**
 * Combines an alias or alias collection into a combined alias collection.
 *
 * @memberof Grids.Config
 * @param {Grids.Definitions.Alias|Grids.Definitions.Alias[]|Grids.Definitions.AliasCollection|Grids.Definitions.AliasCollection[]} aliasesObjects An array of aliases or alias collections.
 * @returns {Grids.Definitions.AliasCollection} Properly formatted alias object
 * @see {@link GridConfig.Alias}
 * @example
 * const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
 * const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
 *
 * let combined = aliasCollection([firstAlias, secondAlias])
 *      // [{ alias: 'MANTA', refersTo: ['A5'] },
 *      //  { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }]
 *
 * combined = aliasCollection(combined, { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] })
 *      // [{ alias: 'MANTA', refersTo: ['A5'] },
 *      //  { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] },
 *      //  { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 *
 * const alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
 * const alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
 *
 * // When combining an alias that already exists, it adds on any new definitions and ignores reused ones.
 * combined = aliasCollection([combined, alias3, alias4])
 *      // [{ alias: 'MANTA', refersTo: ['A5', 'A6', 'A7'] },
 *      //  { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] },
 *      //  { alias: 'RAY', refersTo: ['COFFEE', 'MANTA', 'A6', 'B5', 'B6'] }]
 */
function aliasCollection(aliasesObjects) {
    let safeArray = helpers.toArray(aliasesObjects)

    // Test for invalid aliases or alias collections should throw an error. Nothing can salvage that.
    //      But first, we have to completely destructure the input and make sure it is in the right
    //      format for the rest of the code to work.
    if (safeArray.length === 1) {
        if (Array.isArray(safeArray[0])) {
            // Only one argument was passed, and it looks like it might be an aliasCollection
            if (!validAliasCollection(safeArray[0])) {
                throw new Error('Argument contains an invalid alias collection.')
            }
            // eslint-disable-next-line prefer-destructuring
            safeArray = safeArray[0] // Puts it in the right format for the mapping code
        } else if (!validAlias(safeArray[0])) {
            // It wasn't an aliasCollection, so see if it was a valid alias passed in an array
            throw new Error('Argument contains an invalid alias.')
        }
    } else {
        // It was passed an array of multiple objects.
        const destructuredArray = []
        safeArray.forEach((aliasObject) => {
            if (Array.isArray(aliasObject)) {
                // aliasCollection contained, add each element
                for (let i = 0; i < aliasObject.length; i++) {
                    destructuredArray.push(aliasObject[i])
                }
            } else {
                destructuredArray.push(aliasObject) // Element was a single alias only
            }
        })
        // Check each of these new elements for validity before calling them safe
        destructuredArray.forEach((element) => {
            if (!validAlias(element)) {
                throw new Error('Argument contains an invalid alias.')
            }
        })
        safeArray = destructuredArray
    }

    // Now that all aliases are individually known valid, get a consolidated list of the alias keys

    // Loop through the aliases and pull out only the unique values
    const aliasMap = new Map()
    for (let i = 0; i < safeArray.length; i++) {
        const currentAliasSet = aliasMap.get(safeArray[i].alias)
        if (currentAliasSet) {
            for (let j = 0; j < safeArray[i].refersTo.length; j++) {
                currentAliasSet.add(safeArray[i].refersTo[j])
            }
        } else {
            aliasMap.set(safeArray[i].alias, new Set(safeArray[i].refersTo))
        }
    }

    // Take the map and format it into an array of objects to return
    const outputArray = []
    aliasMap.forEach((values, keys) => {
        outputArray.push({ alias: keys, refersTo: [...values] })
    })

    return outputArray
}

exports.aliasCollection = aliasCollection
