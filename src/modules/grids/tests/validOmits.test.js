const oparea = require('../../../index')

describe('Function `validOmits` Testing', () => {
    const badValues = [null, undefined, '', NaN, 15, Infinity]

    test.each(badValues)('Argument must be an array. Returns False: validOmits(%p)', (value) => {
        expect(oparea.grids.validation.validOmits(value)).toBeFalsy()
    })

    test(`Argument must be an array. Returns False: validOmits('ABC')`, () => {
        expect(oparea.grids.validation.validOmits('ABC')).toBeFalsy()
    })

    test.each(badValues)(
        'Array values must be non-empty strings. Returns False: validOmits([%p])',
        (value) => {
            expect(oparea.grids.validation.validOmits([value])).toBeFalsy()
        }
    )

    test.each([
        [['A1', 'A2', 'G2', 3]],
        [['A1', 'A2', 'G2', undefined]],
        [['A1', 'A2', 'G2', ['A3']]],
        [[2, 3, 4, 5, 6]],
        badValues
    ])('Must have strings in all array elements. Returns False: validOmits(%p)', (value) => {
        expect(oparea.grids.validation.validOmits(value)).toBeFalsy()
    })

    test.each([
        [['A1', 'A2', 'G2']],
        [['A1', 'A2', 'G2', 'undefined']],
        [['A1', 'A2', 'G2', '[A3]']],
        [['2, 3, 4, 5, 6', 'some random string']]
    ])('Must have strings in all array elements. Returns True: validOmits(%p)', (value) => {
        expect(oparea.grids.validation.validOmits(value)).toBeTruthy()
    })
})
