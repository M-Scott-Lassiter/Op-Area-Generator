const oparea = require('../../../index')
const data = require('./grids.testdata')

describe('Function `validAlias` Testing', () => {
    test.each(data.validAliases)('Alias %p validates correctly', (input) => {
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

    test.each([null, undefined, '', NaN, Infinity, 2, [1], { a: 'alias' }])(
        'Invalid alias value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: input, refersTo: ['A5'] }
            expect(oparea.grids.validation.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', NaN, Infinity, 2, { a: 'alias' }])(
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

    test.each(data.validAliases)('Passing known valid aliases should return true', (input) => {
        expect(oparea.grids.validation.validAliasCollection(input)).toBeTruthy()
    })

    test('Passing known valid aliasCollection should return true', () => {
        expect(
            oparea.grids.validation.validAliasCollection([data.alias1, data.alias4, data.alias7])
        ).toBeTruthy()
        expect(oparea.grids.validation.validAliasCollection(data.validAliasCollection)).toBeTruthy()
    })

    test('Passing aliasCollection with duplicated alias should return false', () => {
        expect(oparea.grids.validation.validAliasCollection(data.validAliases)).toBeFalsy()
    })
})

describe('Function `validAxisOptions` Testing', () => {
    const badValues = [null, undefined, '', NaN, Infinity, [1], -2, 'quantity', { someKey: 2 }]

    test.each(badValues)('Must be a good object. Returns False: (%p)', (input) => {
        expect(oparea.grids.validation.validAxisOptions(input)).toBeFalsy()
    })

    test.each([
        { quantity: 2 },
        { extendsPositive: true },
        { quantity: 10, extendsPositive: false }
    ])(
        'Object must contain property "quantity", "extendsPositive", or both. Returns True: %p',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions(input)).toBeTruthy()
        }
    )

    test('Empty objects are allowed. Returns True: {}', () => {
        expect(oparea.grids.validation.validAxisOptions({})).toBeTruthy()
    })

    test.each([
        { extra: 'bad' },
        { quantity: 2, notGood: 'bad' },
        { extendsPositive: true, anotherBad: false },
        { quantity: 10, extendsPositive: false, foreign: [2, 2] }
    ])('Axis does not have additional foreign properties. Returns False: %p', (input) => {
        expect(oparea.grids.validation.validAxisOptions(input)).toBeFalsy()
    })

    test.each(badValues)(
        'Property "quantity" is a positive, non-zero, non-infinite number. Returns False: { quantity: %p }',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions({ quantity: input })).toBeFalsy()
        }
    )

    test.each([2, 200.5])(
        'Property "quantity" is a positive, non-zero, non-infinite number. Returns True: { quantity: %p }',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions({ quantity: input })).toBeTruthy()
        }
    )

    test.each(badValues)(
        'If present, "extendsPositive" must be a boolean. Returns False: { extendsPositive: %p }',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions({ extendsPositive: input })).toBeFalsy()
        }
    )

    test.each([true, false])(
        'If present, "extendsPositive" must be a boolean. Returns True: { extendsPositive: %p }',
        (input) => {
            expect(
                oparea.grids.validation.validAxisOptions({ extendsPositive: input })
            ).toBeTruthy()
        }
    )
})

describe('Function `validBoundaries` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `validGeographicGridConfig` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `validNaming` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `validOmits` Testing', () => {
    test.todo('Add initial tests')
})
