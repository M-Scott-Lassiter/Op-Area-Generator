const { validAliasCollection } = require('../validation/validAliasCollection')
const data = require('./grids.testdata')

describe('Function `validAliasCollection` Testing', () => {
    test.each([null, [1], { a: 'invalid' }])(
        'Passing a known invalid alias or aliasCollection should return false',
        (input) => {
            expect(validAliasCollection(input)).toBeFalsy()
        }
    )

    test.each(data.validAliases)('Passing known valid aliases should return true', (input) => {
        expect(validAliasCollection(input)).toBeTruthy()
    })

    test('Passing known valid aliasCollection should return true', () => {
        expect(validAliasCollection([data.alias1, data.alias4, data.alias7])).toBeTruthy()
        expect(validAliasCollection(data.validAliasCollection)).toBeTruthy()
    })

    test('Passing aliasCollection with duplicated alias should return false', () => {
        expect(validAliasCollection(data.validAliases)).toBeFalsy()
    })
})
