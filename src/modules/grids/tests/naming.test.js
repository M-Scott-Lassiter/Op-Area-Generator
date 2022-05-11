const { naming } = require('../config/naming')
const data = require('./grids.testdata')

let output

describe('Function `naming` Testing', () => {
    beforeEach(() => {
        output = { ...data.defaultNamingObject }
    })

    test('Returns a default object if called with no arguments: naming()', () => {
        expect(naming()).toEqual(data.defaultNamingObject)
    })

    test.each(data.truthyValues)(
        'allowLowerCaseLetters may be any truthy value. Returns valid: naming(%p)',
        (input) => {
            output.allowLowerCaseLetters = true
            expect(naming(input)).toEqual(output)
        }
    )

    test.each([...data.falsyValues, undefined])(
        'allowLowerCaseLetters may be any falsy value. Returns valid: naming(%p)',
        (input) => {
            expect(naming(input)).toEqual(output)
        }
    )

    test.each(data.invalidDictionaries)(
        'dictionary must have valid argument. Throws error: naming(false, %p)',
        (input) => {
            expect(() => {
                naming(false, input)
            }).toThrow()
        }
    )

    test.each(data.validDictionaries)(
        'dictionary must have valid argument. Returns valid: naming(false, %p)',
        (input) => {
            expect(() => {
                naming(false, input)
            }).toBeTruthy()
        }
    )

    test.each(data.truthyValues)(
        `numbersFirst may be any truthy value. Returns valid: naming(false, 'ABC', %p)`,
        (input) => {
            output.numbersFirst = true
            output.dictionary = 'ABC'
            expect(naming(false, 'ABC', input)).toEqual(output)
        }
    )

    test.each([...data.falsyValues, undefined])(
        `numbersFirst may be any falsy value. Returns valid: naming(false, 'ABC', %p)`,

        (input) => {
            output.dictionary = 'ABC'
            expect(naming(false, 'ABC', input)).toEqual(output)
        }
    )

    test.each(data.invalidNumberPadding)(
        `numberPadding must have valid argument. Throws error: naming(false, 'ABC', false, %p)`,

        (input) => {
            expect(() => {
                naming(false, 'ABC', false, input)
            }).toThrow()
        }
    )

    test.each(data.validNumberPadding)(
        `numberPadding must have valid argument. Returns valid: naming(false, 'ABC', false, %p)`,

        (input) => {
            expect(() => {
                naming(false, 'ABC', false, input)
            }).toBeTruthy()
        }
    )

    test.each(data.truthyValues)(
        `numericAxisOnHorizontal may be any truthy value. Returns valid: naming(false, 'ABC', false, 0, %p)`,

        (input) => {
            output.numericAxisOnHorizontal = true
            output.dictionary = 'ABC'
            expect(naming(false, 'ABC', false, 0, input)).toEqual(output)
        }
    )

    test.each(data.falsyValues)(
        `numericAxisOnHorizontal may be any falsy value. Returns valid: naming(false, 'ABC', false, 0, %p)`,

        (input) => {
            output.dictionary = 'ABC'
            expect(naming(false, 'ABC', false, 0, input)).toEqual(output)
        }
    )
})
