/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    root: true,
    overrides: [
        {
          files: ['*.js'],
          extends: ['plugin:@typescript-eslint/disable-type-checked'],
        },
    ],
    rules: {
        // Allow explicit any
        "@typescript-eslint/no-explicit-any": "off",
        // Allow unused vars as interface implementation
        "@typescript-eslint/no-unused-vars": "off",
        // Allow require() statement
        "@typescript-eslint/no-var-requires": "off",
        // Warning when using console
        "no-console": "warn",
    },
};