const oparea = require('../../../index')

describe('Function `axisOptions` Testing', () => {
    const badValues = [null, '', NaN, Infinity, 0, -1, [2], { value: 2 }]
    test.each(badValues)(
        'Grid divisions must be positive, non-zero, non-infinite number. Throws Error: axisOptions(%p)',
        (input) => {
            expect(() => {
                oparea.grids.config.axisOptions(input)
            }).toThrow(/positive non-zero number/)
        }
    )

    test('Providing no parameters returns a formatted default object: {quantity: 10, extendsPositive: true}', () => {
        expect(oparea.grids.config.axisOptions()).toEqual({
            quantity: 10,
            extendsPositive: true
        })
    })

    test('Omitting extendPositive defaults to true. axisOptions(10) -> {quantity: 10, extendsPositive: true}', () => {
        expect(oparea.grids.config.axisOptions(10)).toEqual({
            quantity: 10,
            extendsPositive: true
        })
    })

    test.each([5.1, 5.5, 5.9, 6])(
        'Grid divisions round up to the next integer. axisOptions(%p, true) -> {quantity: 6, extendsPositive: true}',
        (input) => {
            expect(oparea.grids.config.axisOptions(input, true)).toEqual({
                quantity: 6,
                extendsPositive: true
            })
        }
    )

    test.each([true, 2, [123], '2'])(
        'extendPositive may be any truthy value. axisOptions(10, %p) -> {quantity: 10, extendsPositive: true}',
        (input) => {
            expect(oparea.grids.config.axisOptions(10, input)).toEqual({
                quantity: 10,
                extendsPositive: true
            })
        }
    )

    test.each([false, null, ''])(
        'extendPositive may be any falsy value. axisOptions(10, %p) -> {quantity: 10, extendsPositive: false}',
        (input) => {
            expect(oparea.grids.config.axisOptions(10, input)).toEqual({
                quantity: 10,
                extendsPositive: false
            })
        }
    )
})
