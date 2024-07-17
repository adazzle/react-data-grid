import node from 'eslint-plugin-node';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import sonarjs from 'eslint-plugin-sonarjs';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import { fixupPluginRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    files: [
      'src/**/*.tsx',
      'src/**/*.ts',
      'src/**/*.js',
      'test/**/*.tsx',
      'test/**/*.ts',
      'test/**/*.js',
      'website/**/*.tsx',
      'website/**/*.ts',
      'website/**/*.js',
      'vite.config.ts'
    ],
    ignores: ['eslint.config.mjs', 'coverage', 'dist', 'lib']
  },
  {
    plugins: {
      node: fixupPluginRules(node),
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      jest,
      'jest-dom': jestDom,
      sonarjs,
      '@typescript-eslint': typescriptEslint,
      'testing-library': fixupPluginRules(testingLibrary)
    },

    linterOptions: {
      reportUnusedDisableDirectives: true
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        jsxPragma: null,
        project: './tsconfig.json',
        lib: ['ESNext'],
        warnOnUnsupportedTypeScriptVersion: false
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'array-callback-return': [
        1,
        {
          checkForEach: true
        }
      ],

      'constructor-super': 0,
      'for-direction': 1,
      'getter-return': 1,
      'no-async-promise-executor': 1,
      'no-await-in-loop': 0,
      'no-class-assign': 0,
      'no-compare-neg-zero': 1,
      'no-cond-assign': 1,
      'no-const-assign': 0,
      'no-constant-binary-expression': 1,
      'no-constant-condition': 1,
      'no-constructor-return': 1,
      'no-control-regex': 1,
      'no-debugger': 1,
      'no-dupe-args': 1,
      'no-dupe-class-members': 0,
      'no-dupe-else-if': 1,
      'no-dupe-keys': 1,
      'no-duplicate-case': 1,
      'no-duplicate-imports': 0,
      'no-empty-character-class': 1,
      'no-empty-pattern': 1,
      'no-ex-assign': 1,
      'no-fallthrough': 1,
      'no-func-assign': 1,
      'no-import-assign': 1,
      'no-inner-declarations': 0,
      'no-invalid-regexp': 1,
      'no-irregular-whitespace': 1,
      'no-loss-of-precision': 0,
      'no-misleading-character-class': 1,
      'no-new-native-nonconstructor': 1,
      'no-new-symbol': 0,
      'no-obj-calls': 1,
      'no-promise-executor-return': 1,
      'no-prototype-builtins': 1,

      'no-self-assign': [
        1,
        {
          props: true
        }
      ],

      'no-self-compare': 1,
      'no-setter-return': 1,
      'no-sparse-arrays': 1,
      'no-template-curly-in-string': 1,
      'no-this-before-super': 0,
      'no-undef': 0,
      'no-unexpected-multiline': 0,
      'no-unmodified-loop-condition': 1,
      'no-unreachable': 1,
      'no-unreachable-loop': 1,
      'no-unsafe-finally': 1,

      'no-unsafe-negation': [
        1,
        {
          enforceForOrderingRelations: true
        }
      ],

      'no-unsafe-optional-chaining': [
        1,
        {
          disallowArithmeticOperators: true
        }
      ],

      'no-unused-private-class-members': 0,
      'no-unused-vars': 0,
      'no-use-before-define': 0,
      'no-useless-backreference': 1,
      'require-atomic-updates': 1,

      'use-isnan': [
        1,
        {
          enforceForIndexOf: true
        }
      ],

      'valid-typeof': [
        1,
        {
          requireStringLiterals: true
        }
      ],

      'accessor-pairs': 1,
      'arrow-body-style': 0,
      'block-scoped-var': 1,
      camelcase: 0,
      'capitalized-comments': 0,
      'class-methods-use-this': 0,
      complexity: 0,
      'consistent-return': 0,
      'consistent-this': 0,
      curly: 0,
      'default-case': 1,
      'default-case-last': 1,
      'default-param-last': 0,
      'dot-notation': 0,

      eqeqeq: [
        1,
        'always',
        {
          null: 'ignore'
        }
      ],

      'func-name-matching': 0,
      'func-names': 0,
      'func-style': 0,
      'grouped-accessor-pairs': [1, 'getBeforeSet'],
      'guard-for-in': 0,
      'id-denylist': 0,
      'id-length': 0,
      'id-match': 0,
      'init-declarations': 0,

      'logical-assignment-operators': [
        1,
        'always',
        {
          enforceForIfStatements: true
        }
      ],

      'max-classes-per-file': 0,
      'max-depth': 0,
      'max-lines': 0,
      'max-lines-per-function': 0,
      'max-nested-callbacks': 0,
      'max-params': 0,
      'max-statements': 0,
      'multiline-comment-style': 0,
      'new-cap': 0,
      'no-alert': 0,
      'no-array-constructor': 0,
      'no-bitwise': 0,
      'no-caller': 1,
      'no-case-declarations': 1,
      'no-confusing-arrow': 0,
      'no-console': 1,
      'no-continue': 0,
      'no-delete-var': 1,
      'no-div-regex': 0,

      'no-else-return': [
        1,
        {
          allowElseIf: false
        }
      ],

      'no-empty': [
        1,
        {
          allowEmptyCatch: true
        }
      ],

      'no-empty-function': 0,
      'no-empty-static-block': 1,
      'no-eq-null': 0,
      'no-eval': 1,
      'no-extend-native': 1,
      'no-extra-bind': 1,

      'no-extra-boolean-cast': [
        1,
        {
          enforceForLogicalOperands: true
        }
      ],

      'no-extra-label': 1,
      'no-extra-semi': 'off',
      'no-floating-decimal': 'off',
      'no-global-assign': 1,
      'no-implicit-coercion': 0,
      'no-implicit-globals': 0,
      'no-implied-eval': 0,
      'no-inline-comments': 0,
      'no-invalid-this': 0,
      'no-iterator': 1,
      'no-label-var': 1,
      'no-labels': 1,
      'no-lone-blocks': 1,
      'no-lonely-if': 1,
      'no-loop-func': 0,
      'no-magic-numbers': 0,
      'no-mixed-operators': 0,
      'no-multi-assign': 0,
      'no-multi-str': 1,
      'no-negated-condition': 0,
      'no-nested-ternary': 0,
      'no-new': 1,
      'no-new-func': 1,
      'no-new-object': 1,
      'no-new-wrappers': 1,
      'no-nonoctal-decimal-escape': 1,
      'no-octal': 1,
      'no-octal-escape': 1,
      'no-param-reassign': 0,
      'no-plusplus': 0,
      'no-proto': 1,
      'no-redeclare': 0,
      'no-regex-spaces': 1,
      'no-restricted-exports': 0,

      'no-restricted-globals': [
        1,
        {
          name: 'Omit',
          message: 'Use Omit from types instead.'
        }
      ],

      'no-restricted-imports': 0,
      'no-restricted-properties': 0,
      'no-restricted-syntax': 0,
      'no-return-assign': 0,
      'no-return-await': 0,
      'no-script-url': 1,

      'no-sequences': [
        1,
        {
          allowInParentheses: false
        }
      ],

      'no-shadow': 0,
      'no-shadow-restricted-names': 1,
      'no-ternary': 0,
      'no-throw-literal': 0,
      'no-undef-init': 1,
      'no-undefined': 0,
      'no-underscore-dangle': 0,

      'no-unneeded-ternary': [
        1,
        {
          defaultAssignment: false
        }
      ],

      'no-unused-expressions': 0,
      'no-unused-labels': 1,
      'no-useless-call': 1,
      'no-useless-catch': 1,

      'no-useless-computed-key': [
        1,
        {
          enforceForClassMembers: true
        }
      ],

      'no-useless-concat': 1,
      'no-useless-constructor': 0,
      'no-useless-escape': 1,
      'no-useless-rename': 1,
      'no-useless-return': 1,
      'no-var': 1,
      'no-void': 1,
      'no-warning-comments': 0,
      'no-with': 1,

      'object-shorthand': [
        1,
        'always',
        {
          avoidExplicitReturnArrows: true
        }
      ],

      'one-var': [1, 'never'],
      'one-var-declaration-per-line': 'off',
      'operator-assignment': 1,

      'prefer-arrow-callback': [
        1,
        {
          allowNamedFunctions: true
        }
      ],

      'prefer-const': [
        1,
        {
          destructuring: 'all'
        }
      ],

      'prefer-destructuring': [
        1,
        {
          array: false
        }
      ],

      'prefer-exponentiation-operator': 1,
      'prefer-named-capture-group': 0,
      'prefer-numeric-literals': 1,
      'prefer-object-has-own': 1,
      'prefer-object-spread': 1,

      'prefer-promise-reject-errors': [
        1,
        {
          allowEmptyReject: true
        }
      ],

      'prefer-regex-literals': [
        1,
        {
          disallowRedundantWrapping: true
        }
      ],

      'prefer-rest-params': 1,
      'prefer-spread': 1,
      'prefer-template': 1,
      'quote-props': 'off',
      radix: 1,
      'require-await': 0,
      'require-unicode-regexp': 0,
      'require-yield': 1,
      'sort-imports': 0,
      'sort-keys': 0,
      'sort-vars': 0,
      'spaced-comment': 0,
      strict: 1,
      'symbol-description': 1,
      'vars-on-top': 0,
      yoda: 0,
      'array-bracket-newline': 'off',
      'array-bracket-spacing': 'off',
      'array-element-newline': 'off',
      'arrow-parens': 'off',
      'arrow-spacing': 'off',
      'block-spacing': 'off',
      'brace-style': 'off',
      'comma-dangle': 'off',
      'comma-spacing': 'off',
      'comma-style': 'off',
      'computed-property-spacing': 'off',
      'dot-location': 'off',
      'eol-last': 'off',
      'func-call-spacing': 'off',
      'function-call-argument-newline': 'off',
      'function-paren-newline': 'off',
      'generator-star-spacing': 'off',
      'implicit-arrow-linebreak': 'off',
      indent: 'off',
      'jsx-quotes': 'off',
      'key-spacing': 'off',
      'keyword-spacing': 'off',
      'line-comment-position': 0,
      'linebreak-style': 'off',
      'lines-around-comment': 0,
      'lines-between-class-members': 0,
      'max-len': 0,
      'max-statements-per-line': 'off',
      'multiline-ternary': 'off',
      'new-parens': 'off',
      'newline-per-chained-call': 'off',
      'no-extra-parens': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-multi-spaces': 'off',
      'no-multiple-empty-lines': 'off',
      'no-tabs': 0,
      'no-trailing-spaces': 'off',
      'no-whitespace-before-property': 'off',
      'nonblock-statement-body-position': 'off',
      'object-curly-newline': 'off',
      'object-curly-spacing': 'off',
      'object-property-newline': 'off',
      'operator-linebreak': 'off',
      'padded-blocks': 'off',
      'padding-line-between-statements': 0,
      quotes: 0,
      'rest-spread-spacing': 'off',
      semi: 'off',
      'semi-spacing': 'off',
      'semi-style': 'off',
      'space-before-blocks': 'off',
      'space-before-function-paren': 'off',
      'space-in-parens': 'off',
      'space-infix-ops': 'off',
      'space-unary-ops': 'off',
      'switch-colon-spacing': 'off',
      'template-curly-spacing': 'off',
      'template-tag-spacing': 'off',
      'unicode-bom': 1,
      'wrap-iife': 'off',
      'wrap-regex': 'off',
      'yield-star-spacing': 'off',
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

      'react/function-component-definition': [
        1,
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression'
        }
      ],

      'react/hook-use-state': 0,
      'react/iframe-missing-sandbox': 1,
      'react/jsx-boolean-value': 1,
      'react/jsx-child-element-spacing': 'off',
      'react/jsx-closing-bracket-location': 'off',
      'react/jsx-closing-tag-location': 'off',
      'react/jsx-curly-brace-presence': 1,
      'react/jsx-curly-newline': 'off',
      'react/jsx-curly-spacing': 'off',
      'react/jsx-equals-spacing': 'off',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx']
        }
      ],

      'react/jsx-first-prop-new-line': 'off',
      'react/jsx-fragments': 1,
      'react/jsx-handler-names': 0,
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',

      'react/jsx-key': [
        1,
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true
        }
      ],

      'react/jsx-max-depth': 0,
      'react/jsx-max-props-per-line': 'off',
      'react/jsx-newline': 'off',
      'react/jsx-no-bind': 0,
      'react/jsx-no-comment-textnodes': 1,
      'react/jsx-no-constructed-context-values': 1,
      'react/jsx-no-duplicate-props': 0,
      'react/jsx-no-leaked-render': 0,
      'react/jsx-no-literals': 0,
      'react/jsx-no-script-url': 1,
      'react/jsx-no-target-blank': 1,
      'react/jsx-no-undef': 0,
      'react/jsx-no-useless-fragment': 1,
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-pascal-case': 1,
      'react/jsx-props-no-multi-spaces': 'off',
      'react/jsx-props-no-spreading': 0,
      'react/jsx-sort-default-props': 0,
      'react/jsx-sort-props': 0,
      'react/jsx-space-before-closing': 'off',
      'react/jsx-tag-spacing': 'off',
      'react/jsx-uses-react': 0,
      'react/jsx-uses-vars': 1,
      'react/jsx-wrap-multilines': 'off',
      'react/no-access-state-in-setstate': 1,
      'react/no-adjacent-inline-elements': 0,
      'react/no-array-index-key': 0,
      'react/no-arrow-function-lifecycle': 0,
      'react/no-children-prop': 0,
      'react/no-danger': 1,
      'react/no-danger-with-children': 1,
      'react/no-deprecated': 1,
      'react/no-did-mount-set-state': 1,
      'react/no-did-update-set-state': 1,
      'react/no-direct-mutation-state': 1,
      'react/no-find-dom-node': 0,
      'react/no-invalid-html-attribute': 1,
      'react/no-is-mounted': 1,
      'react/no-multi-comp': 0,
      'react/no-namespace': 0,
      'react/no-object-type-as-default-prop': 1,
      'react/no-redundant-should-component-update': 1,
      'react/no-render-return-value': 0,
      'react/no-set-state': 0,

      'react/no-string-refs': [
        1,
        {
          noTemplateLiterals: true
        }
      ],

      'react/no-this-in-sfc': 0,
      'react/no-typos': 1,
      'react/no-unescaped-entities': 0,
      'react/no-unknown-property': 0,
      'react/no-unsafe': 1,

      'react/no-unstable-nested-components': [
        1,
        {
          allowAsProps: true
        }
      ],

      'react/no-unused-class-component-methods': 0,
      'react/no-unused-prop-types': 0,
      'react/no-unused-state': 0,
      'react/no-will-update-set-state': 1,
      'react/prefer-es6-class': 1,
      'react/prefer-exact-props': 0,
      'react/prefer-read-only-props': 0,
      'react/prefer-stateless-function': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'react/require-default-props': 0,
      'react/require-optimization': 0,
      'react/require-render-return': 1,
      'react/self-closing-comp': 1,
      'react/sort-comp': 0,
      'react/sort-default-props': 0,
      'react/sort-prop-types': 0,
      'react/state-in-constructor': 0,
      'react/static-property-placement': 1,
      'react/style-prop-object': 0,
      'react/void-dom-elements-no-children': 1,
      'react-hooks/rules-of-hooks': 1,
      'react-hooks/exhaustive-deps': 1,
      'jest/consistent-test-it': 1,
      'jest/expect-expect': 0,
      'jest/max-expects': 0,
      'jest/max-nested-describe': 0,
      'jest/no-alias-methods': 1,
      'jest/no-commented-out-tests': 1,
      'jest/no-conditional-expect': 1,
      'jest/no-conditional-in-test': 0,
      'jest/no-deprecated-functions': 0,
      'jest/no-disabled-tests': 0,
      'jest/no-done-callback': 0,
      'jest/no-duplicate-hooks': 1,
      'jest/no-export': 1,
      'jest/no-focused-tests': 1,
      'jest/no-hooks': 1,
      'jest/no-identical-title': 1,
      'jest/no-interpolation-in-snapshots': 0,
      'jest/no-jasmine-globals': 1,
      'jest/no-large-snapshots': 0,
      'jest/no-mocks-import': 1,
      'jest/no-restricted-jest-methods': 0,

      'jest/no-restricted-matchers': [
        1,
        {
          toBeTruthy: 'Use toBe(true) instead.',
          'not.toBeTruthy': null,
          toBeFalsy: 'Use toBe(false) instead.',
          'not.toBeFalsy': null
        }
      ],

      'jest/no-standalone-expect': 1,
      'jest/no-test-prefixes': 0,
      'jest/no-test-return-statement': 0,
      'jest/no-untyped-mock-factory': 0,
      'jest/prefer-called-with': 0,
      'jest/prefer-comparison-matcher': 1,
      'jest/prefer-each': 1,
      'jest/prefer-equality-matcher': 1,
      'jest/prefer-expect-assertions': 0,
      'jest/prefer-expect-resolves': 0,
      'jest/prefer-hooks-in-order': 1,
      'jest/prefer-hooks-on-top': 1,
      'jest/prefer-lowercase-title': 0,
      'jest/prefer-mock-promise-shorthand': 1,
      'jest/prefer-snapshot-hint': 0,
      'jest/prefer-spy-on': 1,
      'jest/prefer-strict-equal': 1,
      'jest/prefer-to-be': 1,
      'jest/prefer-to-contain': 1,
      'jest/prefer-to-have-length': 1,
      'jest/prefer-todo': 1,
      'jest/require-hook': 0,
      'jest/require-to-throw-message': 0,
      'jest/require-top-level-describe': 0,
      'jest/valid-describe-callback': 1,

      'jest/valid-expect': [
        1,
        {
          alwaysAwait: true
        }
      ],

      'jest/valid-expect-in-promise': 1,
      'jest/valid-title': 1,
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
      'sonarjs/no-all-duplicated-branches': 1,
      'sonarjs/no-element-overwrite': 1,
      'sonarjs/no-empty-collection': 1,
      'sonarjs/no-extra-arguments': 0,
      'sonarjs/no-identical-conditions': 1,
      'sonarjs/no-identical-expressions': 1,
      'sonarjs/no-ignored-return': 1,
      'sonarjs/no-one-iteration-loop': 1,
      'sonarjs/no-use-of-empty-return-value': 1,
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
      '@typescript-eslint/adjacent-overload-signatures': 1,
      '@typescript-eslint/array-type': 0,
      '@typescript-eslint/await-thenable': 1,

      '@typescript-eslint/ban-ts-comment': [
        1,
        {
          'ts-expect-error': false
        }
      ],

      '@typescript-eslint/ban-tslint-comment': 0,
      '@typescript-eslint/ban-types': 1,
      '@typescript-eslint/class-literal-property-style': 0,
      '@typescript-eslint/consistent-generic-constructors': 1,
      '@typescript-eslint/consistent-indexed-object-style': 1,

      '@typescript-eslint/consistent-type-assertions': [
        1,
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never'
        }
      ],

      '@typescript-eslint/consistent-type-definitions': 1,
      '@typescript-eslint/consistent-type-exports': 0,

      '@typescript-eslint/consistent-type-imports': [
        1,
        {
          fixStyle: 'inline-type-imports'
        }
      ],

      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/method-signature-style': 1,
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/no-base-to-string': 0,
      '@typescript-eslint/no-confusing-non-null-assertion': 0,

      '@typescript-eslint/no-confusing-void-expression': [
        1,
        {
          ignoreArrowShorthand: true
        }
      ],

      '@typescript-eslint/no-duplicate-enum-values': 1,
      '@typescript-eslint/no-duplicate-type-constituents': 1,
      '@typescript-eslint/no-dynamic-delete': 0,
      '@typescript-eslint/no-empty-interface': 1,

      '@typescript-eslint/no-explicit-any': [
        1,
        {
          fixToUnknown: true
        }
      ],

      '@typescript-eslint/no-extra-non-null-assertion': 1,
      '@typescript-eslint/no-extraneous-class': 1,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-for-in-array': 1,
      '@typescript-eslint/no-import-type-side-effects': 0,
      '@typescript-eslint/no-inferrable-types': 1,
      '@typescript-eslint/no-invalid-void-type': 1,
      '@typescript-eslint/no-meaningless-void-operator': 0,
      '@typescript-eslint/no-misused-new': 1,
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-mixed-enums': 1,
      '@typescript-eslint/no-namespace': 1,
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 1,
      '@typescript-eslint/no-non-null-asserted-optional-chain': 1,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-redundant-type-constituents': 1,
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
      '@typescript-eslint/no-unsafe-declaration-merging': 1,
      '@typescript-eslint/no-unsafe-enum-comparison': 1,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 1,
      '@typescript-eslint/no-useless-empty-export': 1,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/non-nullable-type-assertion-style': 1,
      '@typescript-eslint/parameter-properties': 1,
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
          ignorePrimitives: {
            boolean: true,
            string: true
          }
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
      '@typescript-eslint/sort-type-constituents': 0,
      '@typescript-eslint/strict-boolean-expressions': 0,
      '@typescript-eslint/switch-exhaustiveness-check': 1,

      '@typescript-eslint/triple-slash-reference': [
        1,
        {
          path: 'never',
          types: 'never',
          lib: 'never'
        }
      ],

      '@typescript-eslint/type-annotation-spacing': 'off',
      '@typescript-eslint/typedef': 0,
      '@typescript-eslint/unbound-method': 0,
      '@typescript-eslint/unified-signatures': 0,
      '@typescript-eslint/block-spacing': 'off',
      '@typescript-eslint/brace-style': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/comma-spacing': 'off',
      '@typescript-eslint/default-param-last': 0,
      '@typescript-eslint/dot-notation': 1,
      '@typescript-eslint/func-call-spacing': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/init-declarations': 0,
      '@typescript-eslint/key-spacing': 'off',
      '@typescript-eslint/keyword-spacing': 'off',
      '@typescript-eslint/lines-around-comment': 0,
      '@typescript-eslint/lines-between-class-members': 0,
      '@typescript-eslint/no-array-constructor': 1,
      '@typescript-eslint/no-dupe-class-members': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-extra-parens': 'off',
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/no-implied-eval': 1,
      '@typescript-eslint/no-invalid-this': 0,
      '@typescript-eslint/no-loop-func': 0,
      '@typescript-eslint/no-loss-of-precision': 1,
      '@typescript-eslint/no-magic-numbers': 0,
      '@typescript-eslint/no-redeclare': 1,

      '@typescript-eslint/no-restricted-imports': [
        1,
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
        },
        {
          name: '@testing-library/dom',
          message: 'Import @testing-library/react instead.'
        },
        {
          name: 'lodash',
          message: 'Import lodash-es instead.'
        }
      ],

      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/no-throw-literal': 1,

      '@typescript-eslint/no-unused-expressions': [
        1,
        {
          allowTaggedTemplates: true,
          enforceForJSX: true
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        1,
        {
          caughtErrors: 'all',
          ignoreRestSiblings: true
        }
      ],

      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/no-useless-constructor': 1,
      '@typescript-eslint/object-curly-spacing': 'off',

      '@typescript-eslint/padding-line-between-statements': [
        1,
        {
          blankLine: 'always',
          prev: '*',
          next: ['function', 'interface']
        },
        {
          blankLine: 'always',
          prev: ['function', 'interface'],
          next: '*'
        }
      ],

      '@typescript-eslint/quotes': 0,
      '@typescript-eslint/require-await': 1,
      '@typescript-eslint/return-await': 1,
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/space-before-blocks': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/space-infix-ops': 'off',
      'testing-library/await-async-events': 0,
      'testing-library/await-async-queries': 0,
      'testing-library/await-async-utils': 0,
      'testing-library/consistent-data-testid': 0,
      'testing-library/no-await-sync-events': 0,
      'testing-library/no-await-sync-queries': 0,
      'testing-library/no-container': 1,
      'testing-library/no-debugging-utils': 1,
      'testing-library/no-dom-import': 1,
      'testing-library/no-global-regexp-flag-in-query': 1,
      'testing-library/no-manual-cleanup': 0,
      'testing-library/no-node-access': 0,
      'testing-library/no-promise-in-fire-event': 0,
      'testing-library/no-render-in-lifecycle': 0,
      'testing-library/no-unnecessary-act': 1,
      'testing-library/no-wait-for-multiple-assertions': 1,
      'testing-library/no-wait-for-side-effects': 1,
      'testing-library/no-wait-for-snapshot': 0,
      'testing-library/prefer-explicit-assert': 1,
      'testing-library/prefer-find-by': 1,
      'testing-library/prefer-implicit-assert': 0,
      'testing-library/prefer-presence-queries': 1,
      'testing-library/prefer-query-by-disappearance': 1,
      'testing-library/prefer-query-matchers': 0,
      'testing-library/prefer-screen-queries': 1,
      'testing-library/prefer-user-event': 1,
      'testing-library/render-result-naming-convention': 0,
      'babel/quotes': 0,
      'unicorn/template-indent': 0,
      'vue/html-self-closing': 0,
      'vue/max-len': 0,
      '@babel/object-curly-spacing': 'off',
      '@babel/semi': 'off',
      'babel/object-curly-spacing': 'off',
      'babel/semi': 'off',
      'flowtype/boolean-style': 'off',
      'flowtype/delimiter-dangle': 'off',
      'flowtype/generic-spacing': 'off',
      'flowtype/object-type-curly-spacing': 'off',
      'flowtype/object-type-delimiter': 'off',
      'flowtype/quotes': 'off',
      'flowtype/semi': 'off',
      'flowtype/space-after-type-colon': 'off',
      'flowtype/space-before-generic-bracket': 'off',
      'flowtype/space-before-type-colon': 'off',
      'flowtype/union-intersection-spacing': 'off',
      'standard/array-bracket-even-spacing': 'off',
      'standard/computed-property-even-spacing': 'off',
      'standard/object-curly-even-spacing': 'off',
      'unicorn/empty-brace-spaces': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/number-literal-case': 'off',
      'vue/array-bracket-newline': 'off',
      'vue/array-bracket-spacing': 'off',
      'vue/array-element-newline': 'off',
      'vue/arrow-spacing': 'off',
      'vue/block-spacing': 'off',
      'vue/block-tag-newline': 'off',
      'vue/brace-style': 'off',
      'vue/comma-dangle': 'off',
      'vue/comma-spacing': 'off',
      'vue/comma-style': 'off',
      'vue/dot-location': 'off',
      'vue/func-call-spacing': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'vue/html-end-tags': 'off',
      'vue/html-indent': 'off',
      'vue/html-quotes': 'off',
      'vue/key-spacing': 'off',
      'vue/keyword-spacing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/multiline-ternary': 'off',
      'vue/mustache-interpolation-spacing': 'off',
      'vue/no-extra-parens': 'off',
      'vue/no-multi-spaces': 'off',
      'vue/no-spaces-around-equal-signs-in-attribute': 'off',
      'vue/object-curly-newline': 'off',
      'vue/object-curly-spacing': 'off',
      'vue/object-property-newline': 'off',
      'vue/operator-linebreak': 'off',
      'vue/quote-props': 'off',
      'vue/script-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/space-in-parens': 'off',
      'vue/space-infix-ops': 'off',
      'vue/space-unary-ops': 'off',
      'vue/template-curly-spacing': 'off',
      'space-unary-word-ops': 'off',
      'generator-star': 'off',
      'no-comma-dangle': 'off',
      'no-reserved-keys': 'off',
      'no-space-before-semi': 'off',
      'no-wrap-func': 'off',
      'space-after-function-name': 'off',
      'space-before-function-parentheses': 'off',
      'space-in-brackets': 'off',
      'no-arrow-condition': 'off',
      'space-after-keywords': 'off',
      'space-before-keywords': 'off',
      'space-return-throw-case': 'off',
      'no-spaced-func': 'off',
      'indent-legacy': 'off'
    }
  },
  {
    files: ['test/**/*'],

    rules: {
      '@typescript-eslint/no-floating-promises': 1
    }
  },
  {
    files: ['**/*.js', '**/*.cjs'],

    rules: {
      'no-undef': 1,

      'no-use-before-define': [
        1,
        {
          functions: false,
          classes: false,
          variables: false
        }
      ]
    }
  },
  {
    files: ['**/*.js'],

    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: 'off',
        __filename: 'off',
        exports: 'off',
        module: 'off',
        require: 'off'
      }
    },

    rules: {
      'no-console': 0,
      'default-param-last': 1,
      'node/handle-callback-err': 0,
      'node/no-callback-literal': 0,
      'node/no-exports-assign': 0,
      'node/no-extraneous-import': 0,
      'node/no-extraneous-require': 0,
      'node/no-missing-import': 0,
      'node/no-missing-require': 0,
      'node/no-new-require': 1,
      'node/no-path-concat': 1,
      'node/no-process-exit': 0,
      'node/no-unpublished-bin': 0,
      'node/no-unpublished-import': 0,
      'node/no-unpublished-require': 0,
      'node/no-unsupported-features/es-builtins': 0,
      'node/no-unsupported-features/es-syntax': 0,
      'node/no-unsupported-features/node-builtins': 0,
      'node/process-exit-as-throw': 0,
      'node/shebang': 1,
      'node/no-deprecated-api': 0,
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
      'node/prefer-promises/fs': 1
    }
  }
];
