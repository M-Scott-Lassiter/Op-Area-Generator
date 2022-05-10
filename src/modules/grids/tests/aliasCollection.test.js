const oparea = require('../../../index')
const data = require('./grids.testdata')

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
