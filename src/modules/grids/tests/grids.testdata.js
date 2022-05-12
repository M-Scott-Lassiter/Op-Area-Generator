exports.badFunctionCalls = [
    null,
    '',
    NaN,
    Infinity,
    [15],
    '1',
    10.1,
    -1,
    'someStrings',
    { someBadProp: 2 }
] // Intentionally leaves off 'undefined' as this causes problems testing functions that have a default value assigned to it. 'undefined' can thus never get tested.
exports.truthyValues = [true, 1, 'A', [1], { param: 'Test' }]
exports.falsyValues = [false, 0, -0, '', null, undefined, NaN]
exports.falsyValuesNoUndefined = [false, 0, -0, '', null, NaN] // Intentionally leaves off 'undefined' as this causes problems testing functions that have a default value assigned to it. 'undefined' can thus never get tested.
exports.nonBooleanValues = [
    null,
    undefined,
    '',
    NaN,
    Infinity,
    [1],
    '1',
    'some string',
    { someProp: 2 },
    22,
    0
]
exports.nonNumericValues = [null, '', NaN, [1], '1', 'some string', { someProp: 2 }]

exports.alias1 = { alias: 'MANTA', refersTo: ['A5'] }
exports.alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
exports.alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
exports.alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
exports.alias5 = { alias: 'MANTA', refersTo: [''] }
exports.alias6 = { alias: 'MANTA', refersTo: [] }
exports.alias7 = { alias: 'TAPIOCA', refersTo: ['COFFEE', 'MANTA'] }
exports.validAliases = [
    exports.alias1,
    exports.alias2,
    exports.alias3,
    exports.alias4,
    exports.alias5,
    exports.alias6,
    exports.alias7
]
exports.validAliasCollection = [
    { alias: 'MANTA', refersTo: ['A5', 'A6', 'A7', ''] },
    { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] },
    { alias: 'TAPIOCA', refersTo: ['COFFEE', 'MANTA'] }
]

exports.dictionariesNoRepeating = [
    'ABC',
    'aBcD',
    'ZYX',
    'abc',
    'AbCdEfG',
    'PLKNACZQ',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz'
]

exports.dictionariesWithRepeating = [
    'ABCDA',
    'abcda',
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
]

exports.invalidDictionaries = [
    'ABCDA',
    'abcda',
    'ABC!',
    'abc(',
    'Ab?CdEfG',
    'PLK]NA',
    ',ZYX',
    ...exports.falsyValuesNoUndefined
]

exports.validOmits = [
    // An array of arrays... each wrapped in an extra array. Without each array being in its own array, Jest testing does not pick it up right
    [[]],
    [['A1']],
    [['A1', 'A2', 'G2']],
    [['A1', 'A2', 'G2', 'undefined']],
    [['A1', 'A2', 'G2', '[A3]']],
    [['2, 3, 4, 5, 6', 'some random string', '[A2]']]
]
exports.invalidOmits = [
    ['A1', 'A2', 'G2', 3],
    ['A1', 'A2', 'G2', undefined],
    ['A1', 'A2', 'G2', ['A3']],
    [2, 3, 4, 5, 6],
    ...exports.falsyValues
]

exports.validNumberPadding = [0, 0.0001, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9.5, 10]
exports.invalidNumberPadding = [
    -1,
    -10,
    -Infinity,
    10.001,
    11,
    200,
    Infinity,
    ...exports.nonNumericValues
]

exports.badGeographicConfigValues = [
    null,
    '',
    NaN,
    Infinity,
    [15],
    '1',
    10.1,
    -1,
    'someStrings',
    { someBadProp: 2 }
]

exports.validGridSystemIDs = ['ABC', 'abc', 'This is an ID', 'ID #22', '[ZYX]']
exports.invalidGridSystemIDs = [false, 0, -0, null, NaN, 2, ['Test'], { id: 'Test Name' }]

exports.defaultBoundariesValue = { west: -10, south: -20, east: 10, north: 20 }
exports.defaultNamingObject = {
    allowLowerCaseLetters: false,
    dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbersFirst: false,
    numberPadding: 0,
    numericAxisOnHorizontal: false,
    gridSystemID: ''
}
exports.defaultAxisObject = { quantity: 10, extendsPositive: true }
exports.defaultOmits = []
exports.defaultAliases = []
exports.defaultGeographicConfig = {
    boundaries: exports.defaultBoundariesValue,
    naming: exports.defaultNamingObject,
    longitudeAxis: exports.defaultAxisObject,
    latitudeAxis: exports.defaultAxisObject,
    omits: exports.defaultOmits,
    aliases: exports.defaultAliases
}

exports.minAxisSpacing = 1 / 3600 // Corresponds to one arc second of either latitude or longitude
