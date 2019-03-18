'use strict';

const rules = {
  // Possible Errors
  // https://eslint.org/docs/rules/#possible-errors
  'for-direction': 2,
  'getter-return': 2,
  'no-async-promise-executor': 2,
  'no-await-in-loop': 0,
  'no-compare-neg-zero': 2,
  'no-cond-assign': 2,
  'no-console': 0,
  'no-constant-condition': 2,
  'no-control-regex': 2,
  'no-debugger': 2,
  'no-dupe-args': 2,
  'no-dupe-keys': 2,
  'no-duplicate-case': 2,
  'no-empty': [2, { allowEmptyCatch: true }],
  'no-empty-character-class': 2,
  'no-ex-assign': 2,
  'no-extra-boolean-cast': 2,
  'no-extra-parens': 0, // TODO?
  'no-extra-semi': 2,
  'no-func-assign': 2,
  'no-inner-declarations': 0,
  'no-invalid-regexp': 2,
  'no-irregular-whitespace': 2,
  'no-misleading-character-class': 2,
  'no-obj-calls': 2,
  'no-prototype-builtins': 0,
  'no-regex-spaces': 2,
  'no-sparse-arrays': 2,
  'no-template-curly-in-string': 2,
  'no-unexpected-multiline': 2,
  'no-unreachable': 2,
  'no-unsafe-finally': 2,
  'no-unsafe-negation': 2,
  'require-atomic-updates': 2,
  'use-isnan': 2,
  'valid-typeof': [2, { requireStringLiterals: true }],

  // Best Practices
  // https://eslint.org/docs/rules/#best-practices
  'accessor-pairs': 0,
  'array-callback-return': 0,
  'block-scoped-var': 0,
  'class-methods-use-this': 0,
  'complexity': 0,
  'consistent-return': 0,
  'curly': 0,
  'default-case': 0,
  'dot-location': 0,
  'dot-notation': 0,
  'eqeqeq': 0,
  'guard-for-in': 0,
  'max-classes-per-file': 0,
  'no-alert': 0,
  'no-caller': 0,
  'no-case-declarations': 0,
  'no-div-regex': 0,
  'no-else-return': 0,
  'no-empty-function': 0,
  'no-empty-pattern': 0,
  'no-eq-null': 0,
  'no-eval': 0,
  'no-extend-native': 0,
  'no-extra-bind': 0,
  'no-extra-label': 0,
  'no-fallthrough': 0,
  'no-floating-decimal': 0,
  'no-global-assign': 0,
  'no-implicit-coercion': 0,
  'no-implicit-globals': 0,
  'no-implied-eval': 0,
  'no-invalid-this': 0,
  'no-iterator': 0,
  'no-labels': 0,
  'no-lone-blocks': 0,
  'no-loop-func': 0,
  'no-magic-numbers': 0,
  'no-multi-spaces': 1,
  'no-multi-str': 2,
  'no-new': 0,
  'no-new-func': 0,
  'no-new-wrappers': 0,
  'no-octal': 0,
  'no-octal-escape': 0,
  'no-param-reassign': 0,
  'no-proto': 0,
  'no-redeclare': 0,
  'no-restricted-properties': 0,
  'no-return-assign': 0,
  'no-return-await': 0,
  'no-script-url': 0,
  'no-self-assign': 0,
  'no-self-compare': 0,
  'no-sequences': 0,
  'no-throw-literal': 0,
  'no-unmodified-loop-condition': 0,
  'no-unused-expressions': 0,
  'no-unused-labels': 0,
  'no-useless-call': 0,
  'no-useless-catch': 0,
  'no-useless-concat': 0,
  'no-useless-escape': 0,
  'no-useless-return': 0,
  'no-void': 0,
  'no-warning-comments': 0,
  'no-with': 0,
  'prefer-promise-reject-errors': 0,
  'radix': 0,
  'require-await': 0,
  'require-unicode-regexp': 0,
  'vars-on-top': 0,
  'wrap-iife': 0,
  'yoda': 0,

  // Strict Mode
  // https://eslint.org/docs/rules/#strict-mode
  'strict': 0,

  // Variables
  // https://eslint.org/docs/rules/#variables
  'init-declarations': 0,
  'no-delete-var': 2,
  'no-label-var': 2,
  'no-restricted-globals': 0,
  'no-shadow': 0,
  'no-shadow-restricted-names': 2,
  'no-undef': 0,
  'no-undef-init': 1,
  'no-undefined': 0,
  'no-unused-vars': 0,
  'no-use-before-define': [2, { functions: false, classes: false, variables: false }],

  // Node.js and CommonJS
  // https://eslint.org/docs/rules/#nodejs-and-commonjs
  'callback-return': 0,
  'global-require': 0,
  'handle-callback-err': 0,
  'no-buffer-constructor': 0,
  'no-mixed-requires': 0,
  'no-new-require': 0,
  'no-path-concat': 0,
  'no-process-env': 0,
  'no-process-exit': 0,
  'no-restricted-modules': 0,
  'no-sync': 0,

  // Stylistic Issues
  // https://eslint.org/docs/rules/#stylistic-issues
  'array-bracket-newline': 0,
  'array-bracket-spacing': 1,
  'array-element-newline': 0,
  'block-spacing': 1,
  'brace-style': [1, '1tbs', { allowSingleLine: true }],
  'camelcase': 0,
  'capitalized-comments': 0,
  'comma-dangle': 1,
  'comma-spacing': 1,
  'comma-style': 1,
  'computed-property-spacing': 1,
  'consistent-this': 0,
  'eol-last': 1,
  'func-call-spacing': 1,
  'func-name-matching': 0,
  'func-names': 0,
  'func-style': 0,
  'function-paren-newline': 0,
  'id-blacklist': 0,
  'id-length': 0,
  'id-match': 0,
  'implicit-arrow-linebreak': 0,
  'indent': 0,
  'jsx-quotes': 1,
  'key-spacing': 1,
  'keyword-spacing': 1,
  'line-comment-position': 0,
  'linebreak-style': 0,
  'lines-around-comment': 0,
  'lines-between-class-members': 0,
  'max-depth': 0,
  'max-len': 0,
  'max-lines': 0,
  'max-lines-per-function': 0,
  'max-nested-callbacks': 0,
  'max-params': 0,
  'max-statements': 0,
  'max-statements-per-line': 0,
  'multiline-comment-style': 0,
  'multiline-ternary': 0,
  'new-cap': 0,
  'new-parens': 0,
  'newline-per-chained-call': 0,
  'no-array-constructor': 0,
  'no-bitwise': 0,
  'no-continue': 0,
  'no-inline-comments': 0,
  'no-lonely-if': 0,
  'no-mixed-operators': 0,
  'no-mixed-spaces-and-tabs': 1,
  'no-multi-assign': 0,
  'no-multiple-empty-lines': [0, { max: 2, maxEOF: 0, maxBOF: 0 }],
  'no-negated-condition': 0,
  'no-nested-ternary': 0,
  'no-new-object': 0,
  'no-plusplus': 0,
  'no-restricted-syntax': 0,
  'no-tabs': 0,
  'no-ternary': 0,
  'no-trailing-spaces': 1,
  'no-underscore-dangle': 0,
  'no-unneeded-ternary': 0,
  'no-whitespace-before-property': 1,
  'nonblock-statement-body-position': 0,
  'object-curly-newline': 0,
  'object-curly-spacing': [1, 'always'],
  'object-property-newline': 0,
  'one-var': [1, 'never'],
  'one-var-declaration-per-line': 0,
  'operator-assignment': 0,
  'operator-linebreak': 0,
  'padded-blocks': [0, 'never'],
  'padding-line-between-statements': 0,
  'prefer-object-spread': 0,
  'quote-props': [1, 'as-needed'],
  'quotes': 0,
  'semi': 1,
  'semi-spacing': 1,
  'semi-style': 1,
  'sort-keys': 0,
  'sort-vars': 0,
  'space-before-blocks': 1,
  'space-before-function-paren': [1, { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
  'space-in-parens': 1,
  'space-infix-ops': 1,
  'space-unary-ops': 0,
  'spaced-comment': 0,
  'switch-colon-spacing': 1,
  'template-tag-spacing': 1,
  'unicode-bom': 1,
  'wrap-regex': 0,

  // ECMAScript 6
  // https://eslint.org/docs/rules/#ecmascript-6
  'arrow-body-style': 0,
  'arrow-parens': 0,
  'arrow-spacing': 1,
  'constructor-super': 0,
  'generator-star-spacing': 0,
  'no-class-assign': 0,
  'no-confusing-arrow': 0,
  'no-const-assign': 0,
  'no-dupe-class-members': 0,
  'no-duplicate-imports': 0,
  'no-new-symbol': 0,
  'no-restricted-imports': 0,
  'no-this-before-super': 0,
  'no-useless-computed-key': 0,
  'no-useless-constructor': 0,
  'no-useless-rename': 0,
  'no-var': 2,
  'object-shorthand': 0,
  'prefer-arrow-callback': 0,
  'prefer-const': 2,
  'prefer-destructuring': 0,
  'prefer-numeric-literals': 1,
  'prefer-rest-params': 2,
  'prefer-spread': 0,
  'prefer-template': 0,
  'require-yield': 0,
  'rest-spread-spacing': 1,
  'sort-imports': 0,
  'symbol-description': 0,
  'template-curly-spacing': 1,
  'yield-star-spacing': 0,

  // React rules
  // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
  'react/boolean-prop-naming': 0,
  'react/button-has-type': 0,
  'react/default-props-match-prop-types': 0,
  'react/destructuring-assignment': 0,
  'react/display-name': 0,
  'react/forbid-component-props': 0,
  'react/forbid-dom-props': 0,
  'react/forbid-elements': 0,
  'react/forbid-prop-types': 0,
  'react/forbid-foreign-prop-types': 0,
  'react/no-access-state-in-setstate': 0,
  'react/no-array-index-key': 0,
  'react/no-children-prop': 0,
  'react/no-danger': 0,
  'react/no-danger-with-children': 0,
  'react/no-deprecated': 0,
  'react/no-did-mount-set-state': 0,
  'react/no-did-update-set-state': 0,
  'react/no-direct-mutation-state': 0,
  'react/no-find-dom-node': 0,
  'react/no-is-mounted': 0,
  'react/no-multi-comp': 0,
  'react/no-redundant-should-component-update': 0,
  'react/no-render-return-value': 0,
  'react/no-set-state': 0,
  'react/no-typos': 0,
  'react/no-string-refs': 0,
  'react/no-this-in-sfc': 0,
  'react/no-unescaped-entities': 0,
  'react/no-unknown-property': 0,
  'react/no-unsafe': 0,
  'react/no-unused-prop-types': 0,
  'react/no-unused-state': 0,
  'react/no-will-update-set-state': 0,
  'react/prefer-es6-class': 0,
  'react/prefer-stateless-function': 0,
  'react/prop-types': 0,
  'react/react-in-jsx-scope': 0,
  'react/require-default-props': 0,
  'react/require-optimization': 0,
  'react/require-render-return': 0,
  'react/self-closing-comp': 0,
  'react/sort-comp': 0,
  'react/sort-prop-types': 0,
  'react/style-prop-object': 0,
  'react/void-dom-elements-no-children': 0,

  // JSX rules
  // https://github.com/yannickcr/eslint-plugin-react#jsx-specific-rules
  'react/jsx-boolean-value': 0,
  'react/jsx-child-element-spacing': 0,
  'react/jsx-closing-bracket-location': 0,
  'react/jsx-closing-tag-location': 0,
  'react/jsx-curly-spacing': 0,
  'react/jsx-equals-spacing': 1,
  'react/jsx-filename-extension': [1, { extensions: ['js'] }],
  'react/jsx-first-prop-new-line': 0,
  'react/jsx-handler-names': 0,
  'react/jsx-indent': 0,
  'react/jsx-indent-props': 0,
  'react/jsx-key': 0,
  'react/jsx-max-depth': 0,
  'react/jsx-max-props-per-line': 0,
  'react/jsx-no-bind': 0,
  'react/jsx-no-comment-textnodes': 1,
  'react/jsx-no-duplicate-props': 0,
  'react/jsx-no-literals': 0,
  'react/jsx-no-target-blank': 0,
  'react/jsx-no-undef': 0,
  'react/jsx-one-expression-per-line': 0,
  'react/jsx-curly-brace-presence': 0,
  'react/jsx-fragments': 0,
  'react/jsx-pascal-case': 1,
  'react/jsx-props-no-multi-spaces': 1,
  'react/jsx-sort-default-props': 0,
  'react/jsx-sort-props': 0,
  'react/jsx-space-before-closing': 1,
  'react/jsx-tag-spacing': 0,
  'react/jsx-uses-react': 1,
  'react/jsx-uses-vars': 1,
  'react/jsx-wrap-multilines': [0, {
    declaration: 'parens-new-line',
    assignment: 'parens-new-line',
    return: 'parens-new-line',
    arrow: 'parens-new-line',
    condition: 'parens-new-line',
    logical: 'parens-new-line',
    prop: 'parens-new-line'
  }]
};

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true
  },
  plugins: [
    'react'
  ],
  rules
};
