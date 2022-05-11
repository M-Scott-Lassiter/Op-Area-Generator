const { validBoundaries } = require('./validBoundaries')
const { validNaming } = require('./validNaming')
const { validAxisOptions } = require('./validAxisOptions')
const { validAliasCollection } = require('./validAliasCollection')
const { validOmits } = require('./validOmits')

const oneArcSecond = 1 / 3600

/**
 * Validates a geographic grid configuration object for correct formatting.
 *
 * @memberof Grids.Validation
 * @param {Grids.Definitions.GeographicGridConfig} geoConfigObjectToCheck A geographic grid configuration object to check for validity
 * @returns {boolean} True if a valid geographic grid config object
 */
function validConfigGeographic(geoConfigObjectToCheck) {
    // Only objects will validate
    if (typeof geoConfigObjectToCheck !== 'object' || geoConfigObjectToCheck === null) {
        return false
    }

    // Only six discrete keys may exist. This accounts for extra or bad keys
    const keys = Object.keys(geoConfigObjectToCheck)
    for (let i = 0; i < keys.length; i++) {
        if (
            !(
                keys[i] === 'boundaries' ||
                keys[i] === 'naming' ||
                keys[i] === 'longitudeAxis' ||
                keys[i] === 'latitudeAxis' ||
                keys[i] === 'omits' ||
                keys[i] === 'aliases'
            )
        ) {
            return false
        }
    }

    // If the boundaries are not present, or if they are invalid, this entire object is invalid.
    if (
        !('boundaries' in geoConfigObjectToCheck) ||
        !validBoundaries(geoConfigObjectToCheck.boundaries)
        // geoConfigObjectToCheck.boundaries.north - geoConfigObjectToCheck.boundaries.south < oneArcSecond ||
        // geoConfigObjectToCheck.boundaries.east - geoConfigObjectToCheck.boundaries.west < oneArcSecond
    ) {
        return false
    }

    // If present, a valid naming object must be present or this entire object is invalid.
    if ('naming' in geoConfigObjectToCheck && !validNaming(geoConfigObjectToCheck.naming)) {
        return false
    }

    // If present, a valid longitude axis object must be present or this entire object is invalid.
    //  Additionally, the longitude spacing must be at least one arc second
    const longitudeSpacing =
        (geoConfigObjectToCheck.boundaries.east - geoConfigObjectToCheck.boundaries.west) /
        (geoConfigObjectToCheck.longitudeAxis?.quantity || 10)

    if (
        'longitudeAxis' in geoConfigObjectToCheck &&
        (!validAxisOptions(geoConfigObjectToCheck.longitudeAxis) || longitudeSpacing < oneArcSecond)
    ) {
        return false
    }

    // If present, a valid latitude axis object must be present or this entire object is invalid.
    //  Additionally, the latitude spacing must be at least one arc second
    const latitudeSpacing =
        (geoConfigObjectToCheck.boundaries.north - geoConfigObjectToCheck.boundaries.south) /
        (geoConfigObjectToCheck.latitudeAxis?.quantity || 10)

    if (
        'latitudeAxis' in geoConfigObjectToCheck &&
        (!validAxisOptions(geoConfigObjectToCheck.latitudeAxis) || latitudeSpacing < oneArcSecond)
    ) {
        return false
    }

    // If present, a valid omits object must be present or this entire object is invalid.
    if ('omits' in geoConfigObjectToCheck && !validOmits(geoConfigObjectToCheck.omits)) {
        return false
    }

    // If present, a valid aliases object must be present or this entire object is invalid.
    if (
        'aliases' in geoConfigObjectToCheck &&
        !validAliasCollection(geoConfigObjectToCheck.aliases)
    ) {
        return false
    }

    // All validations passed, return true
    return true
}

exports.validConfigGeographic = validConfigGeographic
