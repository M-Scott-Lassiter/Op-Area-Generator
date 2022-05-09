const alias1 = { alias: 'MANTA', refersTo: ['A5'] }
const alias2 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22'] }
const alias3 = { alias: 'MANTA', refersTo: ['A6', 'A7'] }
const alias4 = { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] }
const alias5 = { alias: 'MANTA', refersTo: [''] }
const alias6 = { alias: 'MANTA', refersTo: [] }
const alias7 = { alias: 'TAPIOCA', refersTo: ['COFFEE', 'MANTA'] }
const validAliases = [alias1, alias2, alias3, alias4, alias5, alias6, alias7]
const validAliasCollection = [
    { alias: 'MANTA', refersTo: ['A5', 'A6', 'A7', ''] },
    { alias: 'COFFEE', refersTo: ['BLACK', 'ALIEN', 'G22', 'G23'] },
    { alias: 'TAPIOCA', refersTo: ['COFFEE', 'MANTA'] }
]

exports.alias1 = alias1
exports.alias2 = alias2
exports.alias3 = alias3
exports.alias4 = alias4
exports.alias5 = alias5
exports.alias6 = alias6
exports.alias7 = alias7
exports.validAliases = validAliases
exports.validAliasCollection = validAliasCollection
