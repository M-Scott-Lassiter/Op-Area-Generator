// @ts-check

const oparea = require('../index')

const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
const alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
const alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
const alias5 = { alias: 'MANTA', refersTo: [''] }
const alias6 = { alias: 'MANTA', refersTo: [] }
const alias7 = { alias: 'TAPIOCA', refersTo: ['COFFEE', 'MANTA'] }
const validAliases = [alias1, alias2, alias3, alias4, alias5, alias6, alias7]
const validAliasCollection = [
    { alias: 'MANTA', refersTo: ['A5', 'A6', 'A7', ''] },
    { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] },
    { alias: 'TAPIOCA', refersTo: ['COFFEE', 'MANTA'] }
]

describe('Function `validAlias` Testing', () => {
    test.each(validAliases)('Alias %p validates correctly', (input) => {
        expect(oparea.grids.validation.validAlias(input)).toBeTruthy()
    })

    test('Missing alias property returns false', () => {
        const alias = { refersTo: ['A5'] }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })

    test('Missing refersTo property returns false', () => {
        const alias = { alias: 'MANTA' }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })

    test('Extra properties returns false', () => {
        const alias = { alias: 'MANTA', refersTo: ['A5'], extraProp: true }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })

    test.each([null, undefined, '', 'string', 2, [1]])(
        'Not an object (%p) returns false',
        (input) => {
            expect(oparea.grids.validation.validAlias(input)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', 2, [1], { a: 'alias' }])(
        'Invalid alias value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: input, refersTo: ['A5'] }
            expect(oparea.grids.validation.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', 2, { a: 'alias' }])(
        'Invalid refersTo value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: 'GOODNAME', refersTo: input }
            expect(oparea.grids.validation.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test('Duplicate refersTo returns false', () => {
        const alias = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'BLACK', 'G22', 'G23'] }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })
})

describe('Function `validAliasCollection` Testing', () => {
    test.each([null, [1], { a: 'invalid' }])(
        'Passing a known invalid alias or aliasCollection should return false',
        (input) => {
            expect(oparea.grids.validation.validAliasCollection(input)).toBeFalsy()
        }
    )

    test.each(validAliases)('Passing known valid aliases should return true', (input) => {
        expect(oparea.grids.validation.validAliasCollection(input)).toBeTruthy()
    })

    test('Passing known valid aliasCollection should return true', () => {
        expect(oparea.grids.validation.validAliasCollection([alias1, alias4, alias7])).toBeTruthy()
        expect(oparea.grids.validation.validAliasCollection(validAliasCollection)).toBeTruthy()
    })

    test('Passing aliasCollection with duplicated alias should return false', () => {
        expect(oparea.grids.validation.validAliasCollection(validAliases)).toBeFalsy()
    })
})

describe('Function `alias` Testing', () => {
    test.each([null, undefined, ''])('Alias should throw error on: %p', (input) => {
        expect(() => {
            // eslint-disable-next-line no-unused-vars
            const result = oparea.grids.config.alias(input, 'ValidName')
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
            // eslint-disable-next-line no-unused-vars
            const result = oparea.grids.config.aliasCollection(input)
        }).toThrow(/invalid alias/)
    })

    test.each([alias2, [alias1, alias3]])(
        'Passing invalid alias collections should throw an error',
        () => {
            expect((input) => {
                // eslint-disable-next-line no-unused-vars
                const result = oparea.grids.config.aliasCollection(input)
            }).toThrow(/invalid alias/)
        }
    )

    test('Passing a single good aliases results in a collection', () => {
        expect(oparea.grids.config.aliasCollection([alias1])).toEqual([alias1])
        expect(oparea.grids.validation.validAliasCollection([alias1])).toBeTruthy()
    })

    test('Passing two unique good aliases results in a single concatenated collection', () => {
        expect(oparea.grids.config.aliasCollection([alias1, alias2])).toEqual([alias1, alias2])
        expect(oparea.grids.validation.validAliasCollection([alias1, alias2])).toBeTruthy()
    })

    test('Passing multiple alias objects with repeated alias keys and refersTo consolidates to a concatenated array', () => {
        const input = [alias1, alias2, alias3, alias4]
        const consolidated = [
            { alias: 'MANTA', refersTo: ['A5', 'A6', 'A7'] },
            { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
        ]

        expect(oparea.grids.config.aliasCollection(input)).toEqual(consolidated)
        expect(oparea.grids.validation.validAliasCollection(consolidated)).toBeTruthy()
    })

    test('Passing a single alias collection should return itself', () => {
        expect(oparea.grids.config.aliasCollection(validAliasCollection)).toEqual(
            validAliasCollection
        )
    })

    test('Passing an array of a single alias collection should return itself', () => {
        expect(oparea.grids.config.aliasCollection([validAliasCollection])).toEqual(
            validAliasCollection
        )
    })

    test('Passing an array of an alias and alias collection should return a consolidated alias collection', () => {
        expect(oparea.grids.config.aliasCollection([validAliasCollection, alias1])).toEqual(
            validAliasCollection
        )
    })

    test('Passing an array of an alias collections should return a consolidated alias collection', () => {
        expect(
            oparea.grids.config.aliasCollection([validAliasCollection, [alias1, alias2]])
        ).toEqual(validAliasCollection)
    })
})

describe('Function `geographicBoundaries` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `geographicConfig` Testing', () => {
    test.todo('Add initial tests')
})
