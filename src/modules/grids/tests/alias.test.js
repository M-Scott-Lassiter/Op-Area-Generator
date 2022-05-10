const oparea = require('../../../index')

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
