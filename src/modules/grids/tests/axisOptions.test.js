const { axisOptions } = require('../config/axisOptions')
const data = require('./grids.testdata')

describe('Function `axisOptions` Testing', () => {
    const badDivisionValues = [null, '', NaN, Infinity, 0, -1, [2], { value: 2 }]
    test.each(badDivisionValues)(
        'Grid divisions must be positive, non-zero, non-infinite number. Throws Error: axisOptions(%p)',
        (input) => {
            expect(() => {
                axisOptions(input)
            }).toThrow(/positive non-zero number/)
        }
    )

    test('Providing no parameters returns a formatted default object: {quantity: 10, extendsPositive: true}', () => {
        expect(axisOptions()).toEqual({
            quantity: 10,
            extendsPositive: true
        })
    })

    test('Omitting extendPositive defaults to true. axisOptions(10) -> {quantity: 10, extendsPositive: true}', () => {
        expect(axisOptions(10)).toEqual({
            quantity: 10,
            extendsPositive: true
        })
    })

    test.each([5.1, 5.5, 5.9, 6])(
        'Grid divisions round up to the next integer. axisOptions(%p, true) -> {quantity: 6, extendsPositive: true}',
        (input) => {
            expect(axisOptions(input, true)).toEqual({
                quantity: 6,
                extendsPositive: true
            })
        }
    )

    test.each(data.truthyValues)(
        'extendPositive may be any truthy value. axisOptions(10, %p) -> {quantity: 10, extendsPositive: true}',
        (input) => {
            expect(axisOptions(10, input)).toEqual({
                quantity: 10,
                extendsPositive: true
            })
        }
    )

    test.each(data.falsyValuesNoUndefined)(
        'extendPositive may be any falsy value. axisOptions(10, %p) -> {quantity: 10, extendsPositive: false}',
        (input) => {
            expect(axisOptions(10, input)).toEqual({
                quantity: 10,
                extendsPositive: false
            })
        }
    )
})
