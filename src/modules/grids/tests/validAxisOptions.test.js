const oparea = require('../../../index')

describe('Function `validAxisOptions` Testing', () => {
    const badValues = [null, undefined, '', NaN, Infinity, [1], -2, 'quantity', { someKey: 2 }]

    test.each(badValues)('Must be a good object. Returns False: (%p)', (input) => {
        expect(oparea.grids.validation.validAxisOptions(input)).toBeFalsy()
    })

    test.each([
        { quantity: 2 },
        { extendsPositive: true },
        { quantity: 10, extendsPositive: false }
    ])(
        'Object must contain property "quantity", "extendsPositive", or both. Returns True: %p',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions(input)).toBeTruthy()
        }
    )

    test('Empty objects are allowed. Returns True: {}', () => {
        expect(oparea.grids.validation.validAxisOptions({})).toBeTruthy()
    })

    test.each([
        { extra: 'bad' },
        { quantity: 2, notGood: 'bad' },
        { extendsPositive: true, anotherBad: false },
        { quantity: 10, extendsPositive: false, foreign: [2, 2] }
    ])('Axis does not have additional foreign properties. Returns False: %p', (input) => {
        expect(oparea.grids.validation.validAxisOptions(input)).toBeFalsy()
    })

    test.each(badValues)(
        'Property "quantity" is a positive, non-zero, non-infinite number. Returns False: { quantity: %p }',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions({ quantity: input })).toBeFalsy()
        }
    )

    test.each([2, 200.5])(
        'Property "quantity" is a positive, non-zero, non-infinite number. Returns True: { quantity: %p }',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions({ quantity: input })).toBeTruthy()
        }
    )

    test.each(badValues)(
        'If present, "extendsPositive" must be a boolean. Returns False: { extendsPositive: %p }',
        (input) => {
            expect(oparea.grids.validation.validAxisOptions({ extendsPositive: input })).toBeFalsy()
        }
    )

    test.each([true, false])(
        'If present, "extendsPositive" must be a boolean. Returns True: { extendsPositive: %p }',
        (input) => {
            expect(
                oparea.grids.validation.validAxisOptions({ extendsPositive: input })
            ).toBeTruthy()
        }
    )
})
