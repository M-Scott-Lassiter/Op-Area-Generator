// @ts-check

const oparea = require('../index')

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

describe('Function `validAlias` Testing', () => {
    const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
    const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
    const alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
    const alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
    const alias5 = { alias: 'MANTA', refersTo: [''] }
    const alias6 = { alias: 'MANTA', refersTo: [] }

    test.each([alias1, alias2, alias3, alias4, alias5, alias6])(
        'Alias %p validates correctly',
        (input) => {
            expect(oparea.grids.config.validAlias(input)).toBeTruthy()
        }
    )

    test('Missing alias property returns false', () => {
        const alias = { refersTo: ['A5'] }
        expect(oparea.grids.config.validAlias(alias)).toBeFalsy()
    })

    test('Missing refersTo property returns false', () => {
        const alias = { alias: 'MANTA' }
        expect(oparea.grids.config.validAlias(alias)).toBeFalsy()
    })

    test.each([null, undefined, '', 'string', 2, [1]])(
        'Not an object (%p) returns false',
        (input) => {
            expect(oparea.grids.config.validAlias(input)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', 2, [1], { a: 'alias' }])(
        'Invalid alias value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: input, refersTo: ['A5'] }
            expect(oparea.grids.config.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', 2, { a: 'alias' }])(
        'Invalid refersTo value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: 'GOODNAME', refersTo: input }
            expect(oparea.grids.config.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test('Duplicate refersTo returns false', () => {
        const alias = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'BLACK', 'G22', 'G23'] }
        expect(oparea.grids.config.validAlias(alias)).toBeFalsy()
    })
})

// describe('Initial aliasCollection Testing', () => {
//     const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
//     const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
//     const alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
//     const alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }

//     const invalidAlias1 = { alias: '', refersTo: ['A5'] }

//     test.each([null, undefined, ''])(
//         'aliasCollection should throw error on invalid alias',
//         (input) => {
//             console.log(alias1)
//             expect(() => {
//                 // eslint-disable-next-line no-unused-vars
//                 const result = oparea.grids.config.alias(input, 'ValidName')
//             }).toThrow(/null, undefined, or empty strings/)
//         }
//     )
// })

describe('Function `geographicBoundaries` Testing', () => {
    test.todo('Add initial tests')
})

describe('Function `geographicConfig` Testing', () => {
    test.todo('Add initial tests')
})
