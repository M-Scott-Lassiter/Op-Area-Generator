const oparea = require('../../../index')
const data = require('./grids.testdata')

describe('Function `validAlias` Testing', () => {
    test.each(data.validAliases)('Alias %p validates correctly', (input) => {
        expect(oparea.grids.validation.validAlias(input)).toBeTruthy()
    })

    test('Missing alias property returns false', () => {
        const alias = { refersTo: ['A5'] }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })

    test('Missing refersTo property returns false', () => {
        const alias = { alias: 'MANTA' }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })

    test('Extra properties returns false', () => {
        const alias = { alias: 'MANTA', refersTo: ['A5'], extraProp: true }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })

    test.each([null, undefined, '', 'string', 2, [1]])(
        'Not an object (%p) returns false',
        (input) => {
            expect(oparea.grids.validation.validAlias(input)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', NaN, Infinity, 2, [1], { a: 'alias' }])(
        'Invalid alias value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: input, refersTo: ['A5'] }
            expect(oparea.grids.validation.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test.each([null, undefined, '', NaN, Infinity, 2, { a: 'alias' }])(
        'Invalid refersTo value (%p) returns false',
        (input) => {
            const aliasToTest = { alias: 'GOODNAME', refersTo: input }
            expect(oparea.grids.validation.validAlias(aliasToTest)).toBeFalsy()
        }
    )

    test('Duplicate refersTo returns false', () => {
        const alias = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'BLACK', 'G22', 'G23'] }
        expect(oparea.grids.validation.validAlias(alias)).toBeFalsy()
    })
})

describe('Function `validAliasCollection` Testing', () => {
    test.each([null, [1], { a: 'invalid' }])(
        'Passing a known invalid alias or aliasCollection should return false',
        (input) => {
            expect(oparea.grids.validation.validAliasCollection(input)).toBeFalsy()
        }
    )

    test.each(data.validAliases)('Passing known valid aliases should return true', (input) => {
        expect(oparea.grids.validation.validAliasCollection(input)).toBeTruthy()
    })

    test('Passing known valid aliasCollection should return true', () => {
        expect(
            oparea.grids.validation.validAliasCollection([data.alias1, data.alias4, data.alias7])
        ).toBeTruthy()
        expect(oparea.grids.validation.validAliasCollection(data.validAliasCollection)).toBeTruthy()
    })

    test('Passing aliasCollection with duplicated alias should return false', () => {
        expect(oparea.grids.validation.validAliasCollection(data.validAliases)).toBeFalsy()
    })
})

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

describe('Function `validBoundaries` Testing', () => {
    const badValues = [null, undefined, '', NaN, [1], 'some string']
    const defaultBoundariesValue = { west: -10, south: -20, east: 10, north: 20 }

    test('Proper formatting returns True: validBoundaries({ west: -10, south: -20, east: 10, north: 20})', () => {
        expect(oparea.grids.validation.validBoundaries({ ...defaultBoundariesValue })).toBeTruthy()
    })

    test.each(badValues)('Invalid inputs return False: validBoundaries(%p)', (input) => {
        expect(oparea.grids.validation.validBoundaries(input)).toBeFalsy()
    })

    test.each([
        { south: -20, east: 10, north: 20 },
        { west: -10, east: 10, north: 20 },
        { west: -10, south: -20, north: 20 },
        { west: -10, south: -20, east: 10 }
    ])('Missing required property. Returns False: validBoundaries(%p)', (input) => {
        expect(oparea.grids.validation.validBoundaries(input)).toBeFalsy()
    })

    test('Extra property not allowed. Returns False: validBoundaries({ west: -10, south: -20, east: 10, north: 20, extra: 10 })', () => {
        const testValue = { west: -10, south: -20, east: 10, north: 20, extra: 10 }
        expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
    })

    test.each(badValues)(
        'West values must be numbers. Returns False: validBoundaries({ west: %p, south: -20, east: 10, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.west = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each(badValues)(
        'South values must be numbers. Returns False: validBoundaries({ west: -10, south: %p, east: 10, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.south = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each(badValues)(
        'East values must be numbers. Returns False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.east = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each(badValues)(
        'North values must be numbers. Returns False: validBoundaries({ west: -10, south: -20, east: 10, north: %p})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.north = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([90.001, 1000, Infinity])(
        'Northern boundary cannot be greater than 90. False: validBoundaries({ west: -10, south: -20, east: 10, north: %p})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.north = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([-90.001, -1000, -Infinity])(
        'Southern boundary cannot be less than -90. False: validBoundaries({ west: -10, south: %p, east: 10, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.south = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([-180.001, -1000, -Infinity])(
        'Eastern boundary cannot be less than -180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.east = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([-180.001, -1000, -Infinity])(
        'Western boundary cannot be less than -180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.west = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([180.001, 1000, Infinity])(
        'Eastern boundary cannot be greater than 180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.east = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test.each([180.001, 1000, Infinity])(
        'Western boundary cannot be greater than 180. False: validBoundaries({ west: -10, south: -20, east: %p, north: 20})',
        (input) => {
            const testValue = { ...defaultBoundariesValue }
            testValue.west = input
            expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
        }
    )

    test('North must be greater than south. Returns False: validBoundaries({ west: -10, south: 20, east: 10, north: -20 })', () => {
        const testValue = { west: -10, south: 20, east: 10, north: -20 }
        expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
    })

    test('North cannot equal south. Returns False: validBoundaries({ west: -10, south: 10, east: 10, north: 10 })', () => {
        const testValue = { west: -10, south: 10, east: 10, north: 10 }
        expect(oparea.grids.validation.validBoundaries(testValue)).toBeFalsy()
    })
})

describe('Function `validGeographicGridConfig` Testing', () => {
    test.todo('Add initial tests')
})

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
        const testValue = { allowLowerCaseLetters: input }
        expect(oparea.grids.validation.validAxisOptions(testValue)).toBeFalsy()
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
