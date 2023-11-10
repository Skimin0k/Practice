import webpack from 'webpack'

import {buildSassLoader} from './loaders/SassLoader'
import {buildTypescriptLoader} from './loaders/TypescriptLoader'
import {BuildOptions} from './types/config'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    return [
        buildTypescriptLoader(options),
        buildSassLoader(options.isDev),
    ]
}