const { validNaming } = require('../validation/validNaming')
const data = require('./grids.testdata')

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
        expect(validNaming({})).toBeTruthy()
    })

    test.each(badValuesWithNumber)('Known bad values return False: validNaming(%p)', (input) => {
        expect(validNaming(input)).toBeFalsy()
    })

    // Only six keys may exist:
    //   'allowLowerCaseLetters', 'dictionary', 'numbersFirst', 'numberPadding', 'numericAxisOnHorizontal', 'gridSystemID, or any combination
    test.each([
        { allowLowerCaseLetters: false },
        { dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { numbersFirst: false },
        { numberPadding: 0 },
        { numericAxisOnHorizontal: false },
        { gridSystemID: 'Grid ID Name' },
        { dictionary: 'ABCD', numbersFirst: false, numberPadding: 0 },
        defaultObject
    ])('Object must contain any combination of allowed properties. Returns True: %p', (input) => {
        expect(validNaming(input)).toBeTruthy()
    })

    test.each([
        { allowLowerCaseLetters: false, extra: 'bad' },
        { extra: 22, dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { numbersFirst: false, extra: 'nope' },
        { numberPadding: 0, extra: false },
        { numericAxisOnHorizontal: false, extraProp: 0 },
        { gridSystemID: 'Grid ID Name', numericAxisOnHorizontal: false, extraProp: 0 }
    ])('Axis does not have additional foreign properties. Returns False: %p', (input) => {
        expect(validNaming(input)).toBeFalsy()
    })

    test.each(data.nonBooleanValues)(
        'allowLowerCaseLetters must be boolean. Returns False:{ allowLowerCaseLetters: %p }',
        (input) => {
            const testValue = { allowLowerCaseLetters: input }
            expect(validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([true, false])(
        'allowLowerCaseLetters must be boolean. Returns True:{ allowLowerCaseLetters: %p }',
        (input) => {
            const testValue = { allowLowerCaseLetters: input }
            expect(validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(data.nonBooleanValues)(
        'numbersFirst must be boolean. Returns False:{ numbersFirst: %p }',
        (input) => {
            const testValue = { numbersFirst: input }
            expect(validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([true, false])(
        'numbersFirst must be boolean. Returns True:{ numbersFirst: %p }',
        (input) => {
            const testValue = { numbersFirst: input }
            expect(validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(data.nonBooleanValues)(
        'numericAxisOnHorizontal must be boolean. Returns False:{ numericAxisOnHorizontal: %p }',
        (input) => {
            const testValue = { numericAxisOnHorizontal: input }
            expect(validNaming(testValue)).toBeFalsy()
        }
    )

    test.each([true, false])(
        'numericAxisOnHorizontal must be boolean. Returns True:{ numericAxisOnHorizontal: %p }',
        (input) => {
            const testValue = { numericAxisOnHorizontal: input }
            expect(validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(data.invalidNumberPadding)(
        'numberPadding must be numeric between 0 and 10. Returns False:{ numberPadding: %p }',
        (input) => {
            const testValue = { numberPadding: input }
            expect(validNaming(testValue)).toBeFalsy()
        }
    )

    test.each(data.validNumberPadding)(
        'numberPadding must be numeric between 0 and 10. Returns True:{ numberPadding: %p }',
        (input) => {
            const testValue = { numberPadding: input }
            expect(validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(data.dictionariesWithRepeating)(
        `Dictionary cannot have repeated letters. Returns False: { dictionary: %p}`,
        (input) => {
            expect(validNaming({ dictionary: input })).toBeFalsy()
        }
    )

    test(`Dictionary cannot have numbers. Returns False: { dictionary: 'ABC123' }`, () => {
        expect(validNaming({ dictionary: 'ABC123' })).toBeFalsy()
    })

    test.each(data.invalidDictionaries)(
        'Invalid dictionary values. Returns False:{ dictionary: %p }',
        (input) => {
            const testValue = { dictionary: input }
            expect(validNaming(testValue)).toBeFalsy()
        }
    )

    test.each(data.dictionariesNoRepeating)(
        'Valid dictionary values. Returns True:{ dictionary: %p }',
        (input) => {
            const testValue = { dictionary: input }
            expect(validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(data.validGridSystemIDs)(
        'Valid gridSystemID values. Returns True:{ gridSystemID: %p }',
        (input) => {
            const testValue = { gridSystemID: input }
            expect(validNaming(testValue)).toBeTruthy()
        }
    )

    test.each(data.invalidGridSystemIDs)(
        'Valid gridSystemID values. Returns False:{ gridSystemID: %p }',
        (input) => {
            const testValue = { gridSystemID: input }
            expect(validNaming(testValue)).toBeFalsy()
        }
    )
})
