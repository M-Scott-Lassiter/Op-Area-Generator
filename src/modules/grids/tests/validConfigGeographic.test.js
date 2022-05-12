const { validConfigGeographic } = require('../validation/validConfigGeographic')
const data = require('./grids.testdata')

const bounds = data.defaultBoundariesValue

describe('Function `validConfigGeographic` Testing', () => {
    test('Empty function call not allowed. Returns False: validConfigGeographic()', () => {
        expect(validConfigGeographic({})).toBeFalsy()
    })

    test('Empty objects not allowed. Returns False: validConfigGeographic({})', () => {
        expect(validConfigGeographic({})).toBeFalsy()
    })

    test.each(data.badGeographicConfigValues)(
        'Bad values not allowed. Returns False: validConfigGeographic(%p)',
        (input) => {
            expect(validConfigGeographic(input)).toBeFalsy()
        }
    )

    test('Must have a valid boundaries object. Returns True: validConfigGeographic({ boundaries: bounds })', () => {
        expect(validConfigGeographic({ boundaries: bounds })).toBeTruthy()
    })

    test('Must have a valid boundaries object. Returns False: validConfigGeographic({ boundaries: false })', () => {
        expect(validConfigGeographic({ boundaries: false })).toBeFalsy()
    })

    test('Optional naming object must be valid. Returns True: validConfigGeographic({ boundaries: bounds, naming: naming() })', () => {
        expect(
            validConfigGeographic({ boundaries: bounds, naming: data.defaultNamingObject })
        ).toBeTruthy()
    })

    test('Optional naming object must be valid. Returns False: validConfigGeographic({ boundaries: bounds, naming: false })', () => {
        expect(validConfigGeographic({ boundaries: bounds, naming: false })).toBeFalsy()
    })

    test('Optional longitudeAxis object must be valid. Returns True: validConfigGeographic({ boundaries: bounds, longitudeAxis : axisOptions() })', () => {
        expect(
            validConfigGeographic({ boundaries: bounds, longitudeAxis: data.defaultAxisObject })
        ).toBeTruthy()
    })

    test('Optional longitudeAxis object must be valid. Returns False: validConfigGeographic({ boundaries: bounds, longitudeAxis : false })', () => {
        expect(validConfigGeographic({ boundaries: bounds, longitudeAxis: false })).toBeFalsy()
    })

    test('Optional latitudeAxis object must be valid. Returns True: validConfigGeographic({ boundaries: bounds, latitudeAxis : axisOptions() })', () => {
        expect(
            validConfigGeographic({ boundaries: bounds, latitudeAxis: data.defaultAxisObject })
        ).toBeTruthy()
    })

    test('Optional latitudeAxis object must be valid. Returns False: validConfigGeographic({ boundaries: bounds, latitudeAxis : false })', () => {
        expect(validConfigGeographic({ boundaries: bounds, latitudeAxis: false })).toBeFalsy()
    })

    test('Optional omits object must be valid. Returns True: validConfigGeographic({ boundaries: bounds, omits : [] })', () => {
        expect(validConfigGeographic({ boundaries: bounds, omits: data.defaultOmits })).toBeTruthy()
    })

    test('Optional omits object must be valid. Returns False: validConfigGeographic({ boundaries: bounds, omits: false })', () => {
        expect(validConfigGeographic({ boundaries: bounds, omits: false })).toBeFalsy()
    })

    test('Optional aliases object must be valid. Returns True: validConfigGeographic({ boundaries: bounds, aliases : alias() })', () => {
        expect(validConfigGeographic({ boundaries: bounds, aliases: data.alias1 })).toBeTruthy()
    })

    test('Optional aliases object must be valid. Returns False: validConfigGeographic({ boundaries: bounds, aliases: false })', () => {
        expect(validConfigGeographic({ boundaries: bounds, aliases: false })).toBeFalsy()
    })

    test('Optional aliases object must be valid. Returns True: validConfigGeographic({ boundaries: bounds, aliases : aliasCollection() })', () => {
        expect(
            validConfigGeographic({ boundaries: bounds, aliases: data.validAliasCollection })
        ).toBeTruthy()
    })

    test('Optional aliases object must be valid. Returns False: validConfigGeographic({ boundaries: bounds, aliases: badAliasCollection })', () => {
        expect(validConfigGeographic({ boundaries: bounds, aliases: [[false]] })).toBeFalsy()
    })

    test('Cannot have extra properties. Returns False: validConfigGeographic({ boundaries: bounds, extraProp: false })', () => {
        expect(validConfigGeographic({ boundaries: bounds, extraProp: false })).toBeFalsy()
    })

    test('Minimum latitude spacing must be at least 1 arc second. Returns false: { boundaries: { north: 1, south: 0, east: 0, west: 10 }, latitudeAxis: { quantity: 10000 } }', () => {
        expect(
            validConfigGeographic({
                boundaries: { north: 1, south: 0, east: 0, west: 10 },
                latitudeAxis: { quantity: 10000 }
            })
        ).toBeFalsy()
    })

    test('Minimum longitude spacing must be at least 1 arc second. Returns false: { boundaries: { north: 10, south: 0, east: 0, west: 1 }, longitudeAxis: { quantity: 10000 } }', () => {
        expect(
            validConfigGeographic({
                boundaries: { north: 10, south: 0, east: 1, west: 0 },
                longitudeAxis: { quantity: 10000 }
            })
        ).toBeFalsy()
    })
})
