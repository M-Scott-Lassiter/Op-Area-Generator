// @ts-check

/**
 * This module provides functions that help create grid configuration objects.
 * @module Grids
 */

// const config = require('./grids.config')

/**
 * Creates a GeoJSON object for use in GIS software.
 *
 * This function provides no error checking that omits or aliases exist. This allows the end user
 * to reuse definitions on multiple grids without having to worry about errors. If an omit or alias
 * does not exist, it will just get ignored.
 * @param {GridConfig.GeographicGridConfig} gridConfig Object defining the grid construction
 * @returns {object} Properly formatted GeoJSON object ready for use in GIS software
 * @example
 * const oparea = require('oparea')
 *
 * const bounds = oparea.grids.config.geographicBoundaries(20, -15.5, 40.25, 15.5)
 * const geo = oparea.grids.config.geographicConfig(boundaries)
 *
 * const grid = oparea.grids.geographic(geo)
 */
function geographic(gridConfig) {
    return { gridConfig }
}

exports.geographic = geographic
