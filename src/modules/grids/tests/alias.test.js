const { alias } = require('../config/alias')

describe('Function `alias` Testing', () => {
    test.each([null, undefined, ''])('Alias should throw error on: %p', (input) => {
        expect(() => {
            alias(input, 'ValidName')
        }).toThrow(/null, undefined, or empty strings/)
    })

    test('Single refersTo creates correct object', () => {
        const aliasKey = 'MANTA'
        const refersTo = 'A5'
        const output = { alias: 'MANTA', refersTo: ['A5'] }
        expect(alias(aliasKey, refersTo)).toEqual(output)
    })

    test('Multiple refersTo creates correct object', () => {
        const aliasKey = 'COFFEE'
        const refersTo = ['BLACK', 'ALIEN', 'G22']
        const output = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
        expect(alias(aliasKey, refersTo)).toEqual(output)
    })

    test('Duplicate refersTo ignored in created object', () => {
        const aliasKey = 'COFFEE'
        const refersTo = ['BLACK', 'ALIEN', 'G22', 'BLACK']
        const output = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
        expect(alias(aliasKey, refersTo)).toEqual(output)
    })

    test.each([null, undefined, ''])('RefersTo should be empty array on: %p', (input) => {
        const aliasKey = 'COFFEE'
        const output = { alias: 'COFFEE', refersTo: [''] }
        expect(alias(aliasKey, input)).toEqual(output)
    })
})
