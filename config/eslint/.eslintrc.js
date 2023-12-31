module.exports = {
    'plugins': [
        '@typescript-eslint',
        'react',
        'simple-import-sort',
        'unused-imports'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'import/prefer-default-export': 'off',
        'react/react-in-jsx-scope': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }
        ],
        'no-multiple-empty-lines':['error', {max: 1}],
        'react/display-name': 'off'
    },
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            },
        },
        {
            'files': ['*.js', '*.jsx', '*.ts', '*.tsx'],
            'rules': {
                'simple-import-sort/imports': [
                    'error',
                    {
                        'groups': [
                            // Packages `react` related packages come first.
                            ['^react', '^@?\\w'],
                            // Internal packages.
                            ['^(@|components)(/.*|$)'],
                            // Side effect imports.
                            ['^\\u0000'],
                            // Parent imports. Put `..` last.
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports.
                            ['^.+\\.?(css)$']
                        ]
                    }
                ]
            }
        },

    ],
    'ignorePatterns': ['*.test.*', '**/*.css', '**/*.scss'],
    'env': {
        'browser': true,
        'amd': true,
        'node': true,
        'es2021': true
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
}
