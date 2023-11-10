import webpack from 'webpack'
import {BuildOptions} from './types/config'
import {buildTypescriptLoader} from "./loaders/TypescriptLoader";
import {buildSassLoader} from "./loaders/SassLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    return [
        buildTypescriptLoader(options),
        buildSassLoader(options.isDev),
    ]
}