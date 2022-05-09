const oparea = require('../index')

// This test suite is the final check that the OPAREA package is structured appropriately for export.

describe('Main Object Testing', () => {
    test('Exported OPAREA object exists', () => {
        expect(typeof oparea).toBe('object')
    })

    describe('Contains Grids Object', () => {
        test('Contains grids', () => {
            expect(typeof oparea.grids).toBe('object')
        })

        test.todo('Contains grids.geographic')

        describe('Contains Grids.Config', () => {
            test('Contains grids.config.alias', () => {
                expect('alias' in oparea.grids.config).toBeTruthy()
            })

            test('Contains grids.config.aliasCollection', () => {
                expect('aliasCollection' in oparea.grids.config).toBeTruthy()
            })

            test.todo('Contains grids.config.axisOptions')

            test('Contains grids.config.boundaries', () => {
                expect('boundaries' in oparea.grids.config).toBeTruthy()
            })

            test('Contains grids.config.configGeographic', () => {
                expect('configGeographic' in oparea.grids.config).toBeTruthy()
            })

            test.todo('Contains grids.config.naming')

            test.todo('Contains grids.config.omits')
        })

        describe('Contains Grids.Validation', () => {
            test('Contains grids.validation.validAlias', () => {
                expect('validAlias' in oparea.grids.validation).toBeTruthy()
            })

            test('Contains grids.validation.validAliasCollection', () => {
                expect('validAliasCollection' in oparea.grids.validation).toBeTruthy()
            })

            test.todo('Contains grids.validation.validAxisOptions')

            test.todo('Contains grids.validation.validBoundaries')

            test.todo('Contains grids.validation.validGeographicGridConfig')

            test.todo('Contains grids.validation.validNaming')

            test.todo('Contains grids.validation.validOmits')
        })
    })
})
