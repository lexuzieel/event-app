module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'import': 'off'
    },
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended'
    ],
};
