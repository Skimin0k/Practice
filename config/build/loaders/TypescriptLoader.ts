import ReactRefreshTypeScript from 'react-refresh-typescript'
import webpack from 'webpack'

import {BuildOptions} from '../types/config'

export function buildTypescriptLoader(options: BuildOptions): webpack.RuleSetRule {
    return {
        test: /\.tsx?$/,
        use: [
            {
                loader: require.resolve('ts-loader'),
                options: {
                    getCustomTransformers: () => ({
                        before: [options.isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: options.isDev,
                },
            },
        ],
        exclude: /node_modules/,
    }
}