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
