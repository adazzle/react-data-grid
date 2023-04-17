'use strict';

const ignoreRules = require('eslint-config-prettier').rules;

const rules = {
  // Possible Errors
  // https://eslint.org/docs/rules/#possible-errors
  'for-direction': 2,
  'getter-return': 2,
  'no-async-promise-executor': 2,
  'no-await-in-loop': 0,
  'no-compare-neg-zero': 2,
  'no-cond-assign': 2,
  'no-console': 1,
  'no-constant-condition': 2,
  'no-control-regex': 2,
  'no-debugger': 2,
  'no-dupe-args': 2,
  'no-dupe-else-if': 2,
  'no-dupe-keys': 2,
  'no-duplicate-case': 2,
  'no-empty': [2, { allowEmptyCatch: true }],
  'no-empty-character-class': 2,
  'no-ex-assign': 2,
  'no-extra-boolean-cast': 2,
  'no-extra-parens': 0, // replaced by @typescript-eslint/no-extra-parens
  'no-extra-semi': 0, // replaced by @typescript-eslint/no-extra-semi
  'no-func-assign': 2,
  'no-import-assign': 2,
  'no-inner-declarations': 0,
  'no-invalid-regexp': 2,
  'no-irregular-whitespace': 2,
  'no-loss-of-precision': 0, // replaced by @typescript-eslint/no-loss-of-precision
  'no-misleading-character-class': 2,
  'no-obj-calls': 2,
  'no-promise-executor-return': 1,
  'no-prototype-builtins': 0,
  'no-regex-spaces': 2,
  'no-setter-return': 2,
  'no-sparse-arrays': 2,
  'no-template-curly-in-string': 2,
  'no-unexpected-multiline': 2,
  'no-unreachable': 2,
  'no-unreachable-loop': 1,
  'no-unsafe-finally': 2,
  'no-unsafe-negation': [2, { enforceForOrderingRelations: true }],
  'no-unsafe-optional-chaining': [2, { disallowArithmeticOperators: true }],
  'no-useless-backreference': 2,
  'require-atomic-updates': 2,
  'use-isnan': [2, { enforceForIndexOf: true }],
  'valid-typeof': [2, { requireStringLiterals: true }],

  // Best Practices
  // https://eslint.org/docs/rules/#best-practices
  'accessor-pairs': 2,
  'array-callback-return': [2, { checkForEach: true }],
  'block-scoped-var': 2,
  'class-methods-use-this': 0,
  complexity: 0,
  'consistent-return': 0,
  curly: [2, 'multi-line'],
  'default-case': 2,
  'default-case-last': 2,
  'default-param-last': 0, // replaced by @typescript-eslint/default-param-last
  'dot-location': [1, 'property'],
  'dot-notation': 1,
  eqeqeq: [2, 'always', { null: 'ignore' }],
  'grouped-accessor-pairs': 1,
  'guard-for-in': 0,
  'max-classes-per-file': 0,
  'no-alert': 0,
  'no-caller': 2,
  'no-case-declarations': 2,
  'no-constructor-return': 2,
  'no-div-regex': 0,
  'no-else-return': [1, { allowElseIf: false }],
  'no-empty-function': 0, // replaced by @typescript-eslint/no-empty-function
  'no-empty-pattern': 2,
  'no-eq-null': 0,
  'no-eval': 2,
  'no-extend-native': 2,
  'no-extra-bind': 1,
  'no-extra-label': 2,
  'no-fallthrough': 2,
  'no-floating-decimal': 1,
  'no-global-assign': 2,
  'no-implicit-coercion': 0,
  'no-implicit-globals': [2, { lexicalBindings: true }],
  'no-implied-eval': 0, // replaced by @typescript-eslint/no-implied-eval
  'no-invalid-this': 0, // replaced by @typescript-eslint/no-invalid-this
  'no-iterator': 2,
  'no-labels': 2,
  'no-lone-blocks': 1,
  'no-loop-func': 0, // replaced by @typescript-eslint/no-loop-func
  'no-magic-numbers': 0, // replaced by @typescript-eslint/no-magic-numbers
  'no-multi-spaces': 1,
  'no-multi-str': 2,
  'no-new': 2,
  'no-new-func': 2,
  'no-new-wrappers': 2,
  'no-nonoctal-decimal-escape': 2,
  'no-octal': 2,
  'no-octal-escape': 2,
  'no-param-reassign': 0,
  'no-proto': 2,
  'no-redeclare': 0, // replaced by @typescript-eslint/no-redeclare
  'no-restricted-properties': 0,
  'no-return-assign': 0,
  'no-return-await': 2,
  'no-script-url': 2,
  'no-self-assign': 2,
  'no-self-compare': 2,
  'no-sequences': [2, { allowInParentheses: false }],
  'no-throw-literal': 0, // replaced by @typescript-eslint/no-throw-literal
  'no-unmodified-loop-condition': 2,
  'no-unused-expressions': 0, // replaced by @typescript-eslint/no-unused-expressions
  'no-unused-labels': 2,
  'no-useless-call': 2,
  'no-useless-catch': 2,
  'no-useless-concat': 1,
  'no-useless-escape': 1,
  'no-useless-return': 1,
  'no-void': 1,
  'no-warning-comments': 0,
  'no-with': 2,
  'prefer-named-capture-group': 0,
  'prefer-promise-reject-errors': [2, { allowEmptyReject: true }],
  'prefer-regex-literals': 1,
  radix: 2,
  'require-await': 2,
  'require-unicode-regexp': 0,
  'vars-on-top': 0,
  'wrap-iife': [2, 'inside', { functionPrototypeMethods: true }],
  yoda: 0,

  // Strict Mode
  // https://eslint.org/docs/rules/#strict-mode
  strict: 2,

  // Variables
  // https://eslint.org/docs/rules/#variables
  'init-declarations': 0, // replaced by @typescript-eslint/init-declarations
  'no-delete-var': 2,
  'no-label-var': 2,
  'no-restricted-globals': [
    2,
    {
      name: 'Omit',
      message: 'Use Omit from types instead.'
    }
  ],
  'no-shadow': 0, // replaced by @typescript-eslint/no-shadow
  'no-shadow-restricted-names': 2,
  'no-undef': 0,
  'no-undef-init': 1,
  'no-undefined': 0,
  'no-unused-vars': 0, // replaced by @typescript-eslint/no-unused-vars
  'no-use-before-define': 0, // replaced by @typescript-eslint/no-use-before-define

  // Stylistic Issues
  // https://eslint.org/docs/rules/#stylistic-issues
  'array-bracket-newline': [1, 'consistent'],
  'array-bracket-spacing': 1,
  'array-element-newline': [1, 'consistent'],
  'block-spacing': 1,
  'brace-style': 0, // replaced by @typescript-eslint/brace-style
  camelcase: 0, // replaced by @typescript-eslint/naming-convention
  'capitalized-comments': 0,
  'comma-dangle': 0, // replaced by @typescript-eslint/comma-dangle
  'comma-spacing': 0, // replaced by @typescript-eslint/comma-spacing
  'comma-style': 1,
  'computed-property-spacing': 1,
  'consistent-this': 0,
  'eol-last': 1,
  'func-call-spacing': 0, // replaced by @typescript-eslint/func-call-spacing
  'func-name-matching': 0,
  'func-names': 0,
  'func-style': 0,
  'function-call-argument-newline': 0,
  'function-paren-newline': 0,
  'id-denylist': 0,
  'id-length': 0,
  'id-match': 0,
  'implicit-arrow-linebreak': 0,
  indent: 0, // replaced by @typescript-eslint/indent
  'jsx-quotes': 1,
  'key-spacing': 1,
  'keyword-spacing': 0, // replaced by @typescript-eslint/keyword-spacing
  'line-comment-position': 0,
  'linebreak-style': 0,
  'lines-around-comment': 0,
  'lines-between-class-members': 0, // replaced by @typescript-eslint/lines-between-class-members
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
  'new-parens': 1,
  'newline-per-chained-call': 0,
  'no-array-constructor': 0, // replaced by @typescript-eslint/no-array-constructor
  'no-bitwise': 0,
  'no-continue': 0,
  'no-inline-comments': 0,
  'no-lonely-if': 1,
  'no-mixed-operators': 0,
  'no-mixed-spaces-and-tabs': 1,
  'no-multi-assign': 0,
  'no-multiple-empty-lines': [1, { max: 2, maxEOF: 0, maxBOF: 0 }],
  'no-negated-condition': 0,
  'no-nested-ternary': 0,
  'no-new-object': 1,
  'no-plusplus': 0,
  'no-restricted-syntax': [2, 'SequenceExpression'],
  'no-tabs': 1,
  'no-ternary': 0,
  'no-trailing-spaces': 1,
  'no-underscore-dangle': 0,
  'no-unneeded-ternary': [1, { defaultAssignment: false }],
  'no-whitespace-before-property': 1,
  'nonblock-statement-body-position': 0,
  'object-curly-newline': [1, { consistent: true, multiline: true }],
  'object-curly-spacing': 0, // replaced by @typescript-eslint/object-curly-spacing
  'object-property-newline': [1, { allowAllPropertiesOnSameLine: true }],
  'one-var': [1, 'never'],
  'one-var-declaration-per-line': 0,
  'operator-assignment': 1,
  'operator-linebreak': [1, 'before', { overrides: { '=': 'after' } }],
  'padded-blocks': [1, 'never'],
  'padding-line-between-statements': 0, // replaced by @typescript-eslint/padding-line-between-statements
  'prefer-exponentiation-operator': 1,
  'prefer-object-spread': 1,
  'quote-props': [1, 'as-needed'],
  quotes: 0, // replaced by @typescript-eslint/quotes
  semi: 0, // replaced by @typescript-eslint/semi
  'semi-spacing': 1,
  'semi-style': 1,
  'sort-keys': 0,
  'sort-vars': 0,
  'space-before-blocks': 1,
  'space-before-function-paren': 0, // replaced by @typescript-eslint/space-before-function-paren
  'space-in-parens': 1,
  'space-infix-ops': 0, // replaced by @typescript-eslint/space-infix-ops
  'space-unary-ops': 1,
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
  'no-dupe-class-members': 0, // replaced by @typescript-eslint/no-dupe-class-members
  'no-duplicate-imports': 0, // replaced by @typescript-eslint/no-duplicate-imports
  'no-new-symbol': 0,
  'no-restricted-exports': 0,
  'no-restricted-imports': 0, // replaced by @typescript-eslint/no-restricted-imports
  'no-this-before-super': 0,
  'no-useless-computed-key': [1, { enforceForClassMembers: true }],
  'no-useless-constructor': 0, // replaced by @typescript-eslint/no-useless-constructor
  'no-useless-rename': 1,
  'no-var': 2,
  'object-shorthand': [1, 'always', { avoidExplicitReturnArrows: true }],
  'prefer-arrow-callback': 0,
  'prefer-const': [1, { destructuring: 'all' }],
  'prefer-destructuring': [1, { array: false, object: true }],
  'prefer-numeric-literals': 1,
  'prefer-rest-params': 2,
  'prefer-spread': 1,
  'prefer-template': 1,
  'require-yield': 2,
  'rest-spread-spacing': 1,
  'sort-imports': 0,
  'symbol-description': 1,
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
  'react/forbid-foreign-prop-types': 0,
  'react/forbid-prop-types': 0,
  'react/function-component-definition': 0,
  'react/no-access-state-in-setstate': 2,
  'react/no-adjacent-inline-elements': 0,
  'react/no-array-index-key': 0,
  'react/no-children-prop': 0,
  'react/no-danger': 2,
  'react/no-danger-with-children': 2,
  'react/no-deprecated': 2,
  'react/no-did-mount-set-state': 2,
  'react/no-did-update-set-state': 2,
  'react/no-direct-mutation-state': 2,
  'react/no-find-dom-node': 0,
  'react/no-is-mounted': 2,
  'react/no-multi-comp': 0,
  'react/no-namespace': 0,
  'react/no-redundant-should-component-update': 2,
  'react/no-render-return-value': 0,
  'react/no-set-state': 0,
  'react/no-string-refs': [2, { noTemplateLiterals: true }],
  'react/no-this-in-sfc': 0,
  'react/no-typos': 2,
  'react/no-unescaped-entities': 0,
  'react/no-unknown-property': 0,
  'react/no-unsafe': 2,
  'react/no-unstable-nested-components': 0,
  'react/no-unused-prop-types': 0,
  'react/no-unused-state': 0,
  'react/no-will-update-set-state': 2,
  'react/prefer-es6-class': 2,
  'react/prefer-exact-props': 0,
  'react/prefer-read-only-props': 0,
  'react/prefer-stateless-function': 0,
  'react/prop-types': 0,
  'react/react-in-jsx-scope': 0,
  'react/require-default-props': 0,
  'react/require-optimization': 0,
  'react/require-render-return': 2,
  'react/self-closing-comp': 1,
  'react/sort-comp': 0,
  'react/sort-prop-types': 0,
  'react/state-in-constructor': 0,
  'react/static-property-placement': 1,
  'react/style-prop-object': 2,
  'react/void-dom-elements-no-children': 2,

  // JSX rules
  // https://github.com/yannickcr/eslint-plugin-react#jsx-specific-rules
  'react/jsx-boolean-value': 1,
  'react/jsx-child-element-spacing': 0,
  'react/jsx-closing-bracket-location': 1,
  'react/jsx-closing-tag-location': 1,
  'react/jsx-curly-brace-presence': 1,
  'react/jsx-curly-newline': 1,
  'react/jsx-curly-spacing': 1,
  'react/jsx-equals-spacing': 1,
  'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
  'react/jsx-first-prop-new-line': 1,
  'react/jsx-fragments': 1,
  'react/jsx-handler-names': 0,
  'react/jsx-indent': [1, 2],
  'react/jsx-indent-props': [1, 2],
  'react/jsx-key': 0,
  'react/jsx-max-depth': 0,
  'react/jsx-max-props-per-line': [1, { when: 'multiline' }],
  'react/jsx-newline': 0,
  'react/jsx-no-bind': 0,
  'react/jsx-no-comment-textnodes': 1,
  'react/jsx-no-constructed-context-values': 2,
  'react/jsx-no-duplicate-props': 0,
  'react/jsx-no-literals': 0,
  'react/jsx-no-script-url': 2,
  'react/jsx-no-target-blank': 0,
  'react/jsx-no-undef': 0,
  'react/jsx-no-useless-fragment': [1, { allowExpressions: true }], // TODO: https://github.com/microsoft/TypeScript/issues/21699
  'react/jsx-one-expression-per-line': 0,
  'react/jsx-pascal-case': 1,
  'react/jsx-props-no-multi-spaces': 1,
  'react/jsx-props-no-spreading': 0,
  'react/jsx-sort-default-props': 0,
  'react/jsx-sort-props': 0,
  'react/jsx-tag-spacing': [
    1,
    {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never'
    }
  ],
  'react/jsx-uses-react': 0,
  'react/jsx-uses-vars': 1,
  'react/jsx-wrap-multilines': [
    1,
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }
  ],

  // React Hooks
  // https://www.npmjs.com/package/eslint-plugin-react-hooks
  'react-hooks/rules-of-hooks': 2,
  'react-hooks/exhaustive-deps': 1,

  // https://github.com/jest-community/eslint-plugin-jest#rules
  'jest/consistent-test-it': 1,
  'jest/expect-expect': 0,
  'jest/max-nested-describe': 0,
  'jest/no-alias-methods': 1,
  'jest/no-commented-out-tests': 1,
  'jest/no-conditional-expect': 1,
  'jest/no-deprecated-functions': 1,
  'jest/no-disabled-tests': 0,
  'jest/no-done-callback': 0,
  'jest/no-duplicate-hooks': 2,
  'jest/no-export': 1,
  'jest/no-focused-tests': 1,
  'jest/no-hooks': 1,
  'jest/no-identical-title': 2,
  'jest/no-if': 1,
  'jest/no-interpolation-in-snapshots': 0,
  'jest/no-jasmine-globals': 1,
  'jest/no-large-snapshots': 0,
  'jest/no-mocks-import': 1,
  'jest/no-restricted-matchers': [
    1,
    {
      toBeTruthy: 'Use toBe(true) instead.',
      'not.toBeTruthy': null,
      toBeFalsy: 'Use toBe(false) instead.',
      'not.toBeFalsy': null
    }
  ],
  'jest/no-standalone-expect': 2,
  'jest/no-test-prefixes': 0,
  'jest/no-test-return-statement': 0,
  'jest/prefer-called-with': 0,
  'jest/prefer-expect-assertions': 0,
  'jest/prefer-expect-resolves': 0,
  'jest/prefer-hooks-on-top': 0,
  'jest/prefer-lowercase-title': 0,
  'jest/prefer-spy-on': 2,
  'jest/prefer-strict-equal': 1,
  'jest/prefer-to-be': 1,
  'jest/prefer-to-contain': 1,
  'jest/prefer-to-have-length': 1,
  'jest/prefer-todo': 1,
  'jest/require-hook': 0,
  'jest/require-to-throw-message': 0,
  'jest/require-top-level-describe': 0,
  'jest/valid-describe-callback': 1,
  'jest/valid-expect': [1, { alwaysAwait: true }],
  'jest/valid-expect-in-promise': 1,
  'jest/valid-title': 2,

  // https://github.com/testing-library/eslint-plugin-jest-dom#supported-rules
  'jest-dom/prefer-checked': 1,
  'jest-dom/prefer-empty': 1,
  'jest-dom/prefer-enabled-disabled': 1,
  'jest-dom/prefer-focus': 1,
  'jest-dom/prefer-in-document': 1,
  'jest-dom/prefer-required': 1,
  'jest-dom/prefer-to-have-attribute': 1,
  'jest-dom/prefer-to-have-class': 1,
  'jest-dom/prefer-to-have-style': 1,
  'jest-dom/prefer-to-have-text-content': 1,
  'jest-dom/prefer-to-have-value': 1,

  // SonarJS rules
  // https://github.com/SonarSource/eslint-plugin-sonarjs#rules
  'sonarjs/no-all-duplicated-branches': 2,
  'sonarjs/no-element-overwrite': 2,
  'sonarjs/no-empty-collection': 2,
  'sonarjs/no-extra-arguments': 0,
  'sonarjs/no-identical-conditions': 2,
  'sonarjs/no-identical-expressions': 2,
  'sonarjs/no-ignored-return': 2,
  'sonarjs/no-one-iteration-loop': 2,
  'sonarjs/no-use-of-empty-return-value': 2,
  'sonarjs/non-existent-operator': 1,
  'sonarjs/cognitive-complexity': 0,
  'sonarjs/elseif-without-else': 0,
  'sonarjs/max-switch-cases': 0,
  'sonarjs/no-collapsible-if': 1,
  'sonarjs/no-collection-size-mischeck': 1,
  'sonarjs/no-duplicate-string': 0,
  'sonarjs/no-duplicated-branches': 1,
  'sonarjs/no-gratuitous-expressions': 1,
  'sonarjs/no-identical-functions': 1,
  'sonarjs/no-inverted-boolean-check': 1,
  'sonarjs/no-nested-switch': 1,
  'sonarjs/no-nested-template-literals': 1,
  'sonarjs/no-redundant-boolean': 1,
  'sonarjs/no-redundant-jump': 1,
  'sonarjs/no-same-line-conditional': 1,
  'sonarjs/no-small-switch': 1,
  'sonarjs/no-unused-collection': 1,
  'sonarjs/no-useless-catch': 1,
  'sonarjs/prefer-immediate-return': 1,
  'sonarjs/prefer-object-literal': 1,
  'sonarjs/prefer-single-boolean-return': 1,
  'sonarjs/prefer-while': 1,

  // @typescript-eslint/eslint-plugin rules
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
  '@typescript-eslint/adjacent-overload-signatures': 1,
  '@typescript-eslint/array-type': 0,
  '@typescript-eslint/await-thenable': 1,
  '@typescript-eslint/ban-ts-comment': [1, { 'ts-expect-error': false }],
  '@typescript-eslint/ban-tslint-comment': 1,
  '@typescript-eslint/ban-types': 2,
  '@typescript-eslint/class-literal-property-style': 0,
  '@typescript-eslint/consistent-indexed-object-style': 1,
  '@typescript-eslint/consistent-type-assertions': [
    2,
    { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }
  ],
  '@typescript-eslint/consistent-type-definitions': [1, 'interface'],
  '@typescript-eslint/consistent-type-exports': [
    1,
    { fixMixedExportsWithInlineTypeSpecifier: true }
  ],
  '@typescript-eslint/consistent-type-imports': 1,
  '@typescript-eslint/explicit-function-return-type': 0,
  '@typescript-eslint/explicit-member-accessibility': 0,
  '@typescript-eslint/explicit-module-boundary-types': 0,
  '@typescript-eslint/member-delimiter-style': 1,
  '@typescript-eslint/member-ordering': 0,
  '@typescript-eslint/method-signature-style': 1,
  // TODO: fix
  '@typescript-eslint/naming-convention': 0,
  '@typescript-eslint/no-base-to-string': 0,
  '@typescript-eslint/no-confusing-non-null-assertion': 0,
  '@typescript-eslint/no-confusing-void-expression': [1, { ignoreArrowShorthand: true }],
  '@typescript-eslint/no-dynamic-delete': 0,
  '@typescript-eslint/no-empty-interface': 2,
  '@typescript-eslint/no-explicit-any': [2, { fixToUnknown: true }],
  '@typescript-eslint/no-extra-non-null-assertion': 1,
  '@typescript-eslint/no-extraneous-class': 2,
  '@typescript-eslint/no-floating-promises': 0,
  '@typescript-eslint/no-for-in-array': 1,
  '@typescript-eslint/no-inferrable-types': 1,
  '@typescript-eslint/no-invalid-void-type': 1,
  '@typescript-eslint/no-meaningless-void-operator': 0,
  '@typescript-eslint/no-misused-new': 2,
  '@typescript-eslint/no-misused-promises': 0,
  '@typescript-eslint/no-namespace': 2,
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 1,
  '@typescript-eslint/no-non-null-asserted-optional-chain': 1,
  '@typescript-eslint/no-non-null-assertion': 0,
  '@typescript-eslint/no-parameter-properties': 0,
  '@typescript-eslint/no-require-imports': 1,
  '@typescript-eslint/no-this-alias': 0,
  '@typescript-eslint/no-type-alias': 0,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 1,
  '@typescript-eslint/no-unnecessary-condition': 1,
  '@typescript-eslint/no-unnecessary-qualifier': 0,
  '@typescript-eslint/no-unnecessary-type-arguments': 1,
  '@typescript-eslint/no-unnecessary-type-assertion': 1,
  '@typescript-eslint/no-unnecessary-type-constraint': 1,
  '@typescript-eslint/no-unsafe-argument': 0,
  '@typescript-eslint/no-unsafe-assignment': 0,
  '@typescript-eslint/no-unsafe-call': 0,
  '@typescript-eslint/no-unsafe-member-access': 0,
  '@typescript-eslint/no-unsafe-return': 1,
  '@typescript-eslint/no-var-requires': 0,
  '@typescript-eslint/non-nullable-type-assertion-style': 1,
  '@typescript-eslint/prefer-as-const': 1,
  '@typescript-eslint/prefer-enum-initializers': 0,
  '@typescript-eslint/prefer-for-of': 1,
  '@typescript-eslint/prefer-function-type': 1,
  '@typescript-eslint/prefer-includes': 1,
  '@typescript-eslint/prefer-literal-enum-member': 1,
  '@typescript-eslint/prefer-namespace-keyword': 0,
  '@typescript-eslint/prefer-nullish-coalescing': [
    1,
    {
      ignoreConditionalTests: false,
      ignoreTernaryTests: false,
      ignoreMixedLogicalExpressions: false
    }
  ],
  '@typescript-eslint/prefer-optional-chain': 1,
  '@typescript-eslint/prefer-readonly': 1,
  '@typescript-eslint/prefer-readonly-parameter-types': 0,
  '@typescript-eslint/prefer-reduce-type-parameter': 1,
  '@typescript-eslint/prefer-regexp-exec': 1,
  '@typescript-eslint/prefer-return-this-type': 0,
  '@typescript-eslint/prefer-string-starts-ends-with': 1,
  '@typescript-eslint/prefer-ts-expect-error': 1,
  '@typescript-eslint/promise-function-async': 0,
  '@typescript-eslint/require-array-sort-compare': 1,
  '@typescript-eslint/restrict-plus-operands': 0,
  '@typescript-eslint/restrict-template-expressions': 0,
  '@typescript-eslint/sort-type-union-intersection-members': 0,
  '@typescript-eslint/strict-boolean-expressions': 0,
  '@typescript-eslint/switch-exhaustiveness-check': 2,
  '@typescript-eslint/triple-slash-reference': [2, { path: 'never', types: 'never', lib: 'never' }],
  '@typescript-eslint/type-annotation-spacing': 1,
  '@typescript-eslint/typedef': 0,
  '@typescript-eslint/unbound-method': 0,
  '@typescript-eslint/unified-signatures': 0,

  // @typescript-eslint/eslint-plugin Extension Rules
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules
  '@typescript-eslint/brace-style': [1, '1tbs', { allowSingleLine: true }],
  '@typescript-eslint/comma-dangle': 1,
  '@typescript-eslint/comma-spacing': 1,
  '@typescript-eslint/default-param-last': 0,
  '@typescript-eslint/dot-notation': 0,
  '@typescript-eslint/func-call-spacing': 1,
  '@typescript-eslint/indent': [
    1,
    2,
    { SwitchCase: 1, ignoredNodes: ['TSTypeParameterInstantiation'] }
  ], // https://github.com/typescript-eslint/typescript-eslint/issues/455
  '@typescript-eslint/init-declarations': 0,
  '@typescript-eslint/keyword-spacing': 1,
  '@typescript-eslint/lines-between-class-members': [1, 'always', { exceptAfterSingleLine: true }],
  '@typescript-eslint/no-array-constructor': 2,
  '@typescript-eslint/no-dupe-class-members': 0,
  '@typescript-eslint/no-duplicate-imports': 1,
  '@typescript-eslint/no-empty-function': 0,
  '@typescript-eslint/no-extra-parens': [
    1,
    'all',
    {
      nestedBinaryExpressions: false,
      ignoreJSX: 'all'
    }
  ],
  '@typescript-eslint/no-extra-semi': 2,
  '@typescript-eslint/no-implied-eval': 2,
  '@typescript-eslint/no-invalid-this': 0,
  '@typescript-eslint/no-loop-func': 0,
  '@typescript-eslint/no-loss-of-precision': 2,
  '@typescript-eslint/no-magic-numbers': 0,
  '@typescript-eslint/no-redeclare': 2,
  '@typescript-eslint/no-restricted-imports': [
    1,
    {
      paths: [
        {
          name: 'react',
          importNames: ['default'],
          message: 'Use named imports instead.'
        },
        {
          name: 'react',
          importNames: ['useLayoutEffect'],
          message: 'Use the override from src/hooks instead.'
        },
        {
          name: 'react-dom',
          importNames: ['default'],
          message: 'Use named imports instead.'
        }
      ]
    }
  ],
  '@typescript-eslint/no-shadow': 0,
  '@typescript-eslint/no-throw-literal': 2,
  '@typescript-eslint/no-unused-expressions': [
    2,
    { allowShortCircuit: true, allowTaggedTemplates: true }
  ],
  '@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true }],
  '@typescript-eslint/no-use-before-define': 0,
  '@typescript-eslint/no-useless-constructor': 1,
  '@typescript-eslint/object-curly-spacing': [1, 'always'],
  '@typescript-eslint/padding-line-between-statements': 0,
  '@typescript-eslint/quotes': [1, 'single', { avoidEscape: true }],
  '@typescript-eslint/require-await': 0,
  '@typescript-eslint/return-await': 0,
  '@typescript-eslint/semi': 1,
  '@typescript-eslint/space-before-function-paren': [
    1,
    { anonymous: 'never', named: 'never', asyncArrow: 'always' }
  ],
  '@typescript-eslint/space-infix-ops': 1,
  ...ignoreRules
};

module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    es6: true
  },
  plugins: [
    'node',
    'react',
    'react-hooks',
    'jest',
    'jest-dom',
    'sonarjs',
    '@typescript-eslint',
    'testing-library'
  ],
  overrides: [
    {
      files: ['test/**/*'],
      rules: {
        '@typescript-eslint/no-floating-promises': 1
      }
    },
    {
      files: ['*.js', '*.cjs'],
      rules: {
        'no-undef': 2,
        'no-use-before-define': [2, { functions: false, classes: false, variables: false }]
      }
    },
    {
      files: ['*.js'],
      env: {
        node: true
      },
      globals: {
        __dirname: 'off',
        __filename: 'off',
        exports: 'off',
        module: 'off',
        require: 'off'
      },
      rules: {
        // Possible Errors
        'no-console': 0,
        // Best Practices
        'default-param-last': 2,
        // https://github.com/mysticatea/eslint-plugin-node#-rules
        // Possible Errors
        'node/handle-callback-err': 0,
        'node/no-callback-literal': 0,
        'node/no-exports-assign': 0,
        'node/no-extraneous-import': 0,
        'node/no-extraneous-require': 0,
        'node/no-missing-import': 0,
        'node/no-missing-require': 0,
        'node/no-new-require': 2,
        'node/no-path-concat': 1,
        'node/no-process-exit': 0,
        'node/no-unpublished-bin': 0,
        'node/no-unpublished-import': 0,
        'node/no-unpublished-require': 0,
        'node/no-unsupported-features/es-builtins': 0,
        'node/no-unsupported-features/es-syntax': 0,
        'node/no-unsupported-features/node-builtins': 0,
        'node/process-exit-as-throw': 0,
        'node/shebang': 2,

        // Best Practices
        'node/no-deprecated-api': 0,

        // Stylistic Issues
        'node/callback-return': 0,
        'node/exports-style': 0,
        'node/file-extension-in-import': 0,
        'node/global-require': 1,
        'node/no-mixed-requires': 0,
        'node/no-process-env': 0,
        'node/no-restricted-import': 0,
        'node/no-restricted-require': 0,
        'node/no-sync': 0,
        'node/prefer-global/buffer': 1,
        'node/prefer-global/console': 1,
        'node/prefer-global/process': 1,
        'node/prefer-global/text-decoder': 1,
        'node/prefer-global/text-encoder': 1,
        'node/prefer-global/url-search-params': 1,
        'node/prefer-global/url': 1,
        'node/prefer-promises/dns': 1,
        'node/prefer-promises/fs': 1,

        // eslint-plugin-testing-library Rules
        // https://github.com/testing-library/eslint-plugin-testing-library#supported-rules
        'testing-library/no-wait-for-multiple-assertions': 1,
        'testing-library/no-unnecessary-act': 1,
        'testing-library/no-wait-for-empty-callback': 1,
        'testing-library/no-wait-for-side-effects': 1,
        'testing-library/prefer-explicit-assert': 1,
        'testing-library/prefer-find-by': 1,
        'testing-library/prefer-presence-queries': 1,
        'testing-library/prefer-query-by-disappearance': 1,
        'testing-library/prefer-screen-queries': 1
      }
    }
  ],
  rules
};
