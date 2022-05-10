const oparea = require('../../../index')
const data = require('./grids.testdata')

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
