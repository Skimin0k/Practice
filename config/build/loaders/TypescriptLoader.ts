import {BuildOptions} from "../types/config";
import ReactRefreshTypeScript from 'react-refresh-typescript'
import webpack from "webpack";

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