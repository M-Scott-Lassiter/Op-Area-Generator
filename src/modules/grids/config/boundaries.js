/**
 * Wrapper function to generate a properly validated and formatted geographic grid boundary object
 *
 * @memberof Grids.Config
 * @param {number} western=-10 Western most boundary (Between -180 to 180)
 * @param {number} southern=-20 Southern most boundary (Between -90 to 90)
 * @param {number} eastern=10 Eastern most boundary (Between -180 to 180)
 * @param {number} northern=20 Northern most boundary (Between -90 to 90)
 * @returns {Grids.Definitions.Boundaries} Properly formatted geographic grid boundary object
 * @throws {Error} For non-numeric values
 * @throws {RangeError} Southern boundary is less than -90 |
 * Northern boundary is greater than 90 |
 * Southern boundary is greater than northern boundary |
 * The difference between the eastern and western boundaries exceed 360 degrees
 * @example
 * const bounds = geographicBoundaries() // { west: -10, south: -20, east: 10, north: 20 }
 * const bounds = geographicBoundaries(20, -15.5, 40.25, 15.5) // { west: 20, south: -15.5, east: 40.25, north: 15.5 }
 * const crossAntimeridian = geographicBoundaries(170, -10, -170, 10)// { west: 170, south: -10, east: -170, north: 10 }
 */
function boundaries(western = -10, southern = -20, eastern = 10, northern = 20) {
    return {
        west: western,
        south: southern,
        east: eastern,
        north: northern
    }
}

exports.boundaries = boundaries
