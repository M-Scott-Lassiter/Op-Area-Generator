const oparea = require('../../../index')
const data = require('./grids.testdata')

describe('Function `boundaries` Testing', () => {
    const badValues = [null, '', NaN, 200, -200, Infinity, -Infinity, 'Some string', { value: 2 }]

    test('Calling function with no inputs returns default: boundaries() -> { west: -10, south: -20, east: 10, north: 20 }', () => {
        expect(oparea.grids.config.boundaries()).toEqual(data.defaultBoundariesValue)
    })

    test.each(badValues)(
        'Bad value for western boundary. Throws Error: boundaries(%p)',
        (input) => {
            expect(() => {
                oparea.grids.config.boundaries(input)
            }).toThrow()
        }
    )

    test.each(badValues)(
        'Bad value for southern boundary. Throws Error: boundaries(-10, %p)',
        (input) => {
            expect(() => {
                oparea.grids.config.boundaries(-10, input)
            }).toThrow()
        }
    )

    test.each(badValues)(
        'Bad value for eastern boundary. Throws Error: boundaries(-10, -20, %p)',
        (input) => {
            expect(() => {
                oparea.grids.config.boundaries(-10, -20, input)
            }).toThrow()
        }
    )

    test.each(badValues)(
        'Bad value for northern boundary. Throws Error: boundaries(-10, -20, 10, %p)',
        (input) => {
            expect(() => {
                oparea.grids.config.boundaries(-10, -20, 10, input)
            }).toThrow()
        }
    )

    test.each([
        [-10, -20, 10, 20, { west: -10, south: -20, east: 10, north: 20 }],
        [20, -15.5, 40.25, 15.5, { west: 20, south: -15.5, east: 40.25, north: 15.5 }],
        [170, -10, -170, 10, { west: 170, south: -10, east: -170, north: 10 }] // This one crosses the antimeridian
    ])(
        'Good values returns valid objects. boundaries(%p, %p, %p, %p) -> %p',
        (west, south, east, north, result) => {
            expect(oparea.grids.config.boundaries(west, south, east, north)).toEqual(result)
        }
    )

    test('North cannot equal south. Throws Error: boundaries(-10, -20, 10, -20)', () => {
        expect(() => {
            oparea.grids.config.boundaries(-10, -20, 10, -20)
        }).toThrow()
    })

    test('North cannot be less than south. Throws Error: boundaries(-10, -20, 10, -21)', () => {
        expect(() => {
            oparea.grids.config.boundaries(-10, -20, 10, -21)
        }).toThrow()
    })
})
