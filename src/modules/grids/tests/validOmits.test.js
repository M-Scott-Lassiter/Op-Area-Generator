const { validOmits } = require('../validation/validOmits')
const data = require('./grids.testdata')

describe('Function `validOmits` Testing', () => {
    test(`Argument must be an array. Returns False: validOmits('ABC')`, () => {
        expect(validOmits('ABC')).toBeFalsy()
    })

    test.each([...data.falsyValues])(
        'Array values must be an array of non-empty strings. Returns False: validOmits([%p])',
        (value) => {
            expect(validOmits([value])).toBeFalsy()
        }
    )

    test.each(data.invalidOmits)(
        'Must have strings in all array elements. Returns False: validOmits(%p)',
        (value) => {
            expect(validOmits(value)).toBeFalsy()
        }
    )

    test.each(data.validOmits)(
        'Must have strings in all array elements. Returns True: validOmits(%p)',
        (value) => {
            expect(validOmits(value)).toBeTruthy()
        }
    )
})
