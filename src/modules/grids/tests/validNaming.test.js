const oparea = require('../../../index')

describe('Function `validNaming` Testing', () => {
    const defaultObject = {
        allowLowerCaseLetters: false,
        dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbersFirst: false,
        numberPadding: 0,
        numericAxisOnHorizontal: false
    }
    const badValues = [null, undefined, '', NaN, Infinity, [1], '1', 'some string', { someProp: 2 }]
    const badValuesWithNumber = [...badValues, 2]

    test('Empty objects are allowed. Returns True: {}', () => {
        expect(oparea.grids.validation.validNaming({})).toBeTruthy()
    })

    test.each(badValuesWithNumber)('Known bad values return False: validNaming(%p)', (input) => {
        expect(oparea.grids.validation.validNaming(input)).toBeFalsy()
    })

    // Only five keys may exist:
    //   'allowLowerCaseLetters', 'dictionary', 'numbersFirst', 'numberPadding', 'numericAxisOnHorizontal' or any combination
    test.each([
        { allowLowerCaseLetters: false },
        { dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { numbersFirst: false },
        { numberPadding: 0 },
        { numericAxisOnHorizontal: false },
        { dictionary: 'ABCD', numbersFirst: false, numberPadding: 0 },
        defaultObject
    ])('Object must contain any combination of allowed properties. Returns True: %p', (input) => {
        expect(oparea.grids.validation.validNaming(input)).toBeTruthy()
    })

    test.each([
        { allowLowerCaseLetters: false, extra: 'bad' },
        { extra: 22, dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { numbersFirst: false, extra: 'nope' },
        { numberPadding: 0, extra: false },
        { numericAxisOnHorizontal: false, extraProp: 0 }
    ])('Axis does not have additional foreign properties. Returns False: %p', (input) => {
        expect(oparea.grids.validation.validNaming(input)).toBeFalsy()
    })

    test.each(badValuesWithNumber)(
        'allowLowerCaseLetters must be boolean. Returns False:{ allowLowerCaseLetters: %p }',
        (input) => {
            const testValue = { allowLowerCaseLetters: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([true, false])(
        'allowLowerCaseLetters must be boolean. Returns True:{ allowLowerCaseLetters: %p }',
        (input) => {
            const testValue = { allowLowerCaseLetters: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(badValuesWithNumber)(
        'numbersFirst must be boolean. Returns False:{ numbersFirst: %p }',
        (input) => {
            const testValue = { numbersFirst: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([true, false])(
        'numbersFirst must be boolean. Returns True:{ numbersFirst: %p }',
        (input) => {
            const testValue = { numbersFirst: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(badValuesWithNumber)(
        'numericAxisOnHorizontal must be boolean. Returns False:{ numericAxisOnHorizontal: %p }',
        (input) => {
            const testValue = { numericAxisOnHorizontal: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([true, false])(
        'numericAxisOnHorizontal must be boolean. Returns True:{ numericAxisOnHorizontal: %p }',
        (input) => {
            const testValue = { numericAxisOnHorizontal: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(badValues)(
        'numberPadding must be numeric. Returns False:{ numberPadding: %p }',
        (input) => {
            const testValue = { numberPadding: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([-1, -10, -Infinity, 10.001, 11, 200])(
        'numberPadding must be between 0 and 10. Returns False:{ numberPadding: %p }',
        (input) => {
            const testValue = { numberPadding: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9.5, 10])(
        'numberPadding must be between 0 and 10. Returns True:{ numberPadding: %p }',
        (input) => {
            const testValue = { numberPadding: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeTruthy()
        }
    )

    test(`Dictionary cannot have repeated letters. Returns False: { dictionary: 'ABCDA'}`, () => {
        expect(oparea.grids.validation.validNaming({ dictionary: 'ABCDA' })).toBeFalsy()
    })

    test(`Dictionary cannot have numbers. Returns False: { dictionary: 'ABC123' }`, () => {
        expect(oparea.grids.validation.validNaming({ dictionary: 'ABC123' })).toBeFalsy()
    })

    test.each(['ABC', 'abc', 'AbCdEfG', 'PLKNA', 'ZYX'])(
        'Valid dictionary values. Returns True:{ dictionary: %p }',
        (input) => {
            const testValue = { dictionary: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeTruthy()
        }
    )

    test.each([...badValues, 'ABC!', 'abc(', 'Ab?CdEfG', 'PLK]NA', ',ZYX'])(
        'Invalid dictionary values. Returns False:{ dictionary: %p }',
        (input) => {
            const testValue = { dictionary: input }
            expect(oparea.grids.validation.validNaming(testValue)).toBeFalsy()
        }
    )
})
