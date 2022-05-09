const oparea = require('../../../index')
const data = require('./grids.testdata')

describe('Function `alias` Testing', () => {
    test.each([null, undefined, ''])('Alias should throw error on: %p', (input) => {
        expect(() => {
            oparea.grids.config.alias(input, 'ValidName')
        }).toThrow(/null, undefined, or empty strings/)
    })

    test('Single refersTo creates correct object', () => {
        const alias = 'MANTA'
        const refersTo = 'A5'
        const output = { alias: 'MANTA', refersTo: ['A5'] }
        expect(oparea.grids.config.alias(alias, refersTo)).toEqual(output)
    })

    test('Multiple refersTo creates correct object', () => {
        const alias = 'COFFEE'
        const refersTo = ['BLACK', 'ALIEN', 'G22']
        const output = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
        expect(oparea.grids.config.alias(alias, refersTo)).toEqual(output)
    })

    test('Duplicate refersTo ignored in created object', () => {
        const alias = 'COFFEE'
        const refersTo = ['BLACK', 'ALIEN', 'G22', 'BLACK']
        const output = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
        expect(oparea.grids.config.alias(alias, refersTo)).toEqual(output)
    })

    test.each([null, undefined, ''])('RefersTo should be empty array on: %p', (input) => {
        const alias = 'COFFEE'
        const output = { alias: 'COFFEE', refersTo: [''] }
        expect(oparea.grids.config.alias(alias, input)).toEqual(output)
    })
})

describe('Function `aliasCollection` Testing', () => {
    test.each([false, ['Invalid']])('Passing an invalid alias should throw an error', () => {
        expect((input) => {
            oparea.grids.config.aliasCollection(input)
        }).toThrow(/invalid alias/)
    })

    test.each([data.alias2, [data.alias1, data.alias3]])(
        'Passing invalid alias collections should throw an error',
        () => {
            expect((input) => {
                oparea.grids.config.aliasCollection(input)
            }).toThrow(/invalid alias/)
        }
    )

    test('Passing a single good aliases results in a collection', () => {
        expect(oparea.grids.config.aliasCollection([data.alias1])).toEqual([data.alias1])
        expect(oparea.grids.validation.validAliasCollection([data.alias1])).toBeTruthy()
    })

    test('Passing two unique good aliases results in a single concatenated collection', () => {
        expect(oparea.grids.config.aliasCollection([data.alias1, data.alias2])).toEqual([
            data.alias1,
            data.alias2
        ])
        expect(
            oparea.grids.validation.validAliasCollection([data.alias1, data.alias2])
        ).toBeTruthy()
    })

    test('Passing multiple alias objects with repeated alias keys and refersTo consolidates to a concatenated array', () => {
        const input = [data.alias1, data.alias2, data.alias3, data.alias4]
        const consolidated = [
            { alias: 'MANTA', refersTo: ['A5', 'A6', 'A7'] },
            { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
        ]

        expect(oparea.grids.config.aliasCollection(input)).toEqual(consolidated)
        expect(oparea.grids.validation.validAliasCollection(consolidated)).toBeTruthy()
    })

    test('Passing a single alias collection should return itself', () => {
        expect(oparea.grids.config.aliasCollection(data.validAliasCollection)).toEqual(
            data.validAliasCollection
        )
    })

    test('Passing an array of a single alias collection should return itself', () => {
        expect(oparea.grids.config.aliasCollection([data.validAliasCollection])).toEqual(
            data.validAliasCollection
        )
    })

    test('Passing an array of an alias and alias collection should return a consolidated alias collection', () => {
        expect(
            oparea.grids.config.aliasCollection([data.validAliasCollection, data.alias1])
        ).toEqual(data.validAliasCollection)
    })

    test('Passing an array of an alias collections should return a consolidated alias collection', () => {
        expect(
            oparea.grids.config.aliasCollection([
                data.validAliasCollection,
                [data.alias1, data.alias2]
            ])
        ).toEqual(data.validAliasCollection)
    })
})

describe('Function `axisOptions` Testing', () => {
    const badValues = [null, '', NaN, Infinity, 0, -1, [2], { value: 2 }]
    test.each(badValues)(
        'Grid divisions must be positive, non-zero, non-infinite number. Throws Error: axisOptions(%p)',
        (input) => {
            expect(() => {
                oparea.grids.config.axisOptions(input)
            }).toThrow(/positive non-zero number/)
        }
    )

    test('Providing no parameters returns a formatted default object: {quantity: 10, extendsPositive: true}', () => {
        expect(oparea.grids.config.axisOptions()).toEqual({
            quantity: 10,
            extendsPositive: true
        })
    })

    test('Omitting extendPositive defaults to true. axisOptions(10) -> {quantity: 10, extendsPositive: true}', () => {
        expect(oparea.grids.config.axisOptions(10)).toEqual({
            quantity: 10,
            extendsPositive: true
        })
    })

    test.each([5.1, 5.5, 5.9, 6])(
        'Grid divisions round up to the next integer. axisOptions(%p, true) -> {quantity: 6, extendsPositive: true}',
        (input) => {
            expect(oparea.grids.config.axisOptions(input, true)).toEqual({
                quantity: 6,
                extendsPositive: true
            })
        }
    )

    test.each([true, 2, [123], '2'])(
        'extendPositive may be any truthy value. axisOptions(10, %p) -> {quantity: 10, extendsPositive: true}',
        (input) => {
            expect(oparea.grids.config.axisOptions(10, input)).toEqual({
                quantity: 10,
                extendsPositive: true
            })
        }
    )

    test.each([false, null, ''])(
        'extendPositive may be any falsy value. axisOptions(10, %p) -> {quantity: 10, extendsPositive: false}',
        (input) => {
            expect(oparea.grids.config.axisOptions(10, input)).toEqual({
                quantity: 10,
                extendsPositive: false
            })
        }
    )
})

describe('Function `boundaries` Testing', () => {
    const badValues = [null, '', NaN, 200, -200, Infinity, -Infinity, 'Some string', { value: 2 }]

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

    test('Calling function with no inputs returns default: boundaries() -> { west: -10, south: -20, east: 10, north: 20 }', () => {
        expect(oparea.grids.config.aliasCollection(data.validAliasCollection)).toEqual(
            data.validAliasCollection
        )
    })
})

describe('Function `configGeographic` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `naming` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `omits` Testing', () => {
    test.todo('Add initial tests')
})
