const { configGeographic } = require('../config/configGeographic')
const data = require('./grids.testdata')

const bounds = data.defaultBoundariesValue

describe('Function `configGeographic` Testing', () => {
    test.each(data.badGeographicConfigValues)(
        'Throws Error on known bad input: configGeographic(%p)',
        (input) => {
            expect(() => {
                configGeographic(input)
            }).toThrow(/valid grid definition/)
        }
    )
    test('Returns a default object if called with no arguments. Returns default: configGeographic()', () => {
        expect(configGeographic()).toEqual(data.defaultGeographicConfig)
    })

    test('Optional boundaries object must be valid. Returns valid: configGeographic( {boundaries: { west: -10, south: -20, east: 10, north: 20 }} )', () => {
        expect(configGeographic({ boundaries: data.defaultBoundariesValue })).toEqual(
            data.defaultGeographicConfig
        )
    })

    test.each([...data.badGeographicConfigValues, { west: -10, south: -20, east: 10, north: 200 }])(
        'Optional boundaries object must be valid. Throws error: configGeographic( {boundaries: %p} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: input })
            }).toThrow(/valid grid definition/)
        }
    )

    test('Optional naming object must be valid. Returns valid: configGeographic( {boundaries: bounds, naming: {<default>}} )', () => {
        expect(configGeographic({ boundaries: bounds, naming: data.defaultNamingObject })).toEqual(
            data.defaultGeographicConfig
        )
    })

    test.each(data.badGeographicConfigValues)(
        'Optional naming object must be valid. Throws error: configGeographic( {boundaries: bounds, naming: %p} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: bounds, naming: input })
            }).toThrow(/valid grid definition/)
        }
    )

    test('Optional longitudeAxis object must be valid. Returns valid: configGeographic( {boundaries: bounds, longitudeAxis: {<default>}} )', () => {
        expect(
            configGeographic({ boundaries: bounds, longitudeAxis: data.defaultAxisObject })
        ).toEqual(data.defaultGeographicConfig)
    })

    const longitudeSpacingTooSmall = {
        boundaries: { north: 10, south: 0, east: 1, west: 0 }, // Must be at least one arc second
        longitudeAxis: { quantity: 10000 }
    }
    test.each([...data.badGeographicConfigValues, longitudeSpacingTooSmall])(
        'Optional longitudeAxis object must be valid. Throws error: configGeographic( {boundaries: bounds, longitudeAxis: %p} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: bounds, longitudeAxis: input })
            }).toThrow(/valid grid definition/)
        }
    )

    test('Optional latitudeAxis object must be valid. Returns valid: configGeographic( {boundaries: bounds, latitudeAxis: {<default>}} )', () => {
        expect(
            configGeographic({ boundaries: bounds, latitudeAxis: data.defaultAxisObject })
        ).toEqual(data.defaultGeographicConfig)
    })

    const latitudeSpacingTooSmall = {
        boundaries: { north: 1, south: 0, east: 0, west: 10 }, // Must be at least one arc second
        latitudeAxis: { quantity: 10000 }
    }
    test.each([...data.badGeographicConfigValues, latitudeSpacingTooSmall])(
        'Optional latitudeAxis object must be valid. Throws error: configGeographic( {boundaries: bounds, latitudeAxis: %p} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: bounds, latitudeAxis: input })
            }).toThrow(/valid grid definition/)
        }
    )

    test.each(data.validOmits)(
        'Optional omits array must be valid. Returns valid: configGeographic( {boundaries: bounds, omits: %p )',
        (input) => {
            const testOutput = { ...data.defaultGeographicConfig }
            testOutput.omits = input
            expect(configGeographic({ boundaries: bounds, omits: input })).toEqual(testOutput)
        }
    )

    test.each(data.invalidOmits)(
        'Optional omits array must be valid. Throws error: configGeographic( {boundaries: bounds, omits: %p} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: bounds, omits: input })
            }).toThrow(/valid grid definition/)
        }
    )

    test.each(data.validAliases)(
        'Optional aliases must be valid. Returns valid: configGeographic( {boundaries: bounds, aliases: %p )',
        (input) => {
            const testOutput = { ...data.defaultGeographicConfig }
            testOutput.aliases = input
            expect(configGeographic({ boundaries: bounds, aliases: input })).toEqual(testOutput)
        }
    )

    test.each(data.badGeographicConfigValues)(
        'Optional aliases must be valid. Throws error: configGeographic( {boundaries: bounds, aliases: %p} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: bounds, aliases: input })
            }).toThrow(/valid grid definition/)
        }
    )

    const validAliasCollection = [...data.validAliases]
    validAliasCollection.push([data.alias1, data.alias2])
    validAliasCollection.push(data.validAliasCollection)
    test.each(validAliasCollection)(
        'Optional alias collections must be valid. Returns valid: configGeographic( {boundaries: bounds, aliases: [%p] )',
        (input) => {
            const testOutput = { ...data.defaultGeographicConfig }
            testOutput.aliases = input
            expect(configGeographic({ boundaries: bounds, aliases: input })).toEqual(testOutput)
        }
    )

    const invalidAliasCollection = [...data.invalidOmits] // While these are invalid omit options, they are also invalid alias collections. Reusing
    invalidAliasCollection.push([data.alias1, data.alias3]) // Reuses alias key
    test.each(invalidAliasCollection)(
        'Optional alias collections must be valid. Throws error: configGeographic( {boundaries: bounds, aliases: [%p]} )',
        (input) => {
            expect(() => {
                configGeographic({ boundaries: bounds, aliases: [input] })
            }).toThrow(/valid grid definition/)
        }
    )
})
