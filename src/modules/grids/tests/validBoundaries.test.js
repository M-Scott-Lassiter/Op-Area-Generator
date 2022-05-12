const { validBoundaries } = require('../validation/validBoundaries')

describe('Function `validBoundaries` Testing', () => {
    const badValues = [null, undefined, '', NaN, [1], 'some string']
    const defaultBoundariesValue = { west: -10, south: -20, east: 10, north: 20 }

    test('Proper formatting returns True: validBoundaries({ west: -10, south: -20, east: 10, north: 20})', () => {
        expect(validBoundaries({ ...defaultBoundariesValue })).toBeTruthy()
    })

    test.each(badValues)('Invalid inputs return False: validBoundaries(%p)', (input) => {
        expect(validBoundaries(input)).toBeFalsy()
    })

    test.each([
        { south: -20, east: 10, north: 20 },
        { west: -10, east: 10, north: 20 },
        { west: -10, south: -20, north: 20 },
        { west: -10, south: -20, east: 10 }
    ])('Missing required property. Returns False: validBoundaries(%p)', (input) => {
        expect(validBoundaries(input)).toBeFalsy()
    })

    test('Extra property not allowed. Returns False: validBoundaries({ west: -10, south: -20, east: 10, north: 20, extra: 10 })', () => {
        const testValue = { west: -10, south: -20, east: 10, north: 20, extra: 10 }
        expect(validBoundaries(testValue)).toBeFalsy()
    })

    test.each(badValues)(
        'West values must be numbers. Returns False: validBoundaries({ west: %p, south: -20, east: 10, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.west = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each(badValues)(
        'South values must be numbers. Returns False: validBoundaries({ west: -10, south: %p, east: 10, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.south = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each(badValues)(
        'East values must be numbers. Returns False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.east = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each(badValues)(
        'North values must be numbers. Returns False: validBoundaries({ west: -10, south: -20, east: 10, north: %p})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.north = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([90.001, 1000, Infinity])(
        'Northern boundary cannot be greater than 90. False: validBoundaries({ west: -10, south: -20, east: 10, north: %p})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.north = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([-90.001, -1000, -Infinity])(
        'Southern boundary cannot be less than -90. False: validBoundaries({ west: -10, south: %p, east: 10, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.south = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([-180.001, -1000, -Infinity])(
        'Eastern boundary cannot be less than -180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.east = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([-180.001, -1000, -Infinity])(
        'Western boundary cannot be less than -180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.west = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([180.001, 1000, Infinity])(
        'Eastern boundary cannot be greater than 180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.east = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([180.001, 1000, Infinity])(
        'Western boundary cannot be greater than 180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.west = input
            expect(validBoundaries(testValue)).toBeFalsy()
        }
    )

    test('North must be greater than south. Returns False: validBoundaries({ west: -10, south: 20, east: 10, north: -20 })', () => {
        const testValue = { west: -10, south: 20, east: 10, north: -20 }
        expect(validBoundaries(testValue)).toBeFalsy()
    })

    test('North cannot equal south. Returns False: validBoundaries({ west: -10, south: 10, east: 10, north: 10 })', () => {
        const testValue = { west: -10, south: 10, east: 10, north: 10 }
        expect(validBoundaries(testValue)).toBeFalsy()
    })
})
