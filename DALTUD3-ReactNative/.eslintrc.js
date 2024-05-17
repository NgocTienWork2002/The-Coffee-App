module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                trailingComma: 'all',
                tabWidth: 4,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: true,
            },
        ],
    },
};
