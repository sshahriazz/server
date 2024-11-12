import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['node_modules', 'dist'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.strict,
    eslintConfigPrettier,
    {
        files: ['**/*.{js,cjs,mjs,ts}'],

        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
    // JavaScript files config
    {
        files: ['**/*.{js,cjs,mjs}'],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            'no-console': 'warn',
            'no-var': 'error',
        },
    },
    // TypeScript files config
    {
        files: ['**/*.ts'],

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ['./tsconfig.eslint.json'],
            },
        },
        rules: {
            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': ['warn'],
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
            ],
        },
    },
]
