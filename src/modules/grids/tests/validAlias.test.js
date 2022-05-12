const { validAlias } = require('../validation/validAlias')
const data = require('./grids.testdata')

describe('Function `validAlias` Testing', () => {
    test.each(data.validAliases)('Alias %p validates correctly', (input) => {
        expect(validAlias(input)).toBeTruthy()
    })

    test('Missing alias property returns false', () => {
        const alias = { refersTo: ['A5'] }
        expect(validAlias(alias)).toBeFalsy()
    })

    test('Missing refersTo property returns false', () => {
        const alias = { alias: 'MANTA' }
        expect(validAlias(alias)).toBeFalsy()
    })

    test('Extra properties returns false', () => {
        const alias = { alias: 'MANTA', refersTo: ['A5'], extraProp: true }
        expect(validAlias(alias)).toBeFalsy()
    })

    test.each([null, undefined, '', 'string', 2, [1]])(
        'Not an object (%p) returns false',
        (input) => {
            expect(validAlias(input)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', NaN, Infinity, 2, [1], { a: 'alias' }])(
        'Invalid alias value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: input, refersTo: ['A5'] }
            expect(validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', NaN, Infinity, 2, { a: 'alias' }])(
        'Invalid refersTo value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: 'GOODNAME', refersTo: input }
            expect(validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test('Duplicate refersTo returns false', () => {
        const alias = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'BLACK', 'G22', 'G23'] }
        expect(validAlias(alias)).toBeFalsy()
    })
})
